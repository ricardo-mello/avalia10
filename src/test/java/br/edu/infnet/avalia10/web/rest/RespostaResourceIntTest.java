package br.edu.infnet.avalia10.web.rest;

import br.edu.infnet.avalia10.Avalia10App;

import br.edu.infnet.avalia10.domain.Resposta;
import br.edu.infnet.avalia10.repository.RespostaRepository;
import br.edu.infnet.avalia10.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import br.edu.infnet.avalia10.domain.enumeration.RespostaEnum;
/**
 * Test class for the RespostaResource REST controller.
 *
 * @see RespostaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Avalia10App.class)
public class RespostaResourceIntTest {

    private static final RespostaEnum DEFAULT_TIPO = RespostaEnum.NAO_CONCORDO_T;
    private static final RespostaEnum UPDATED_TIPO = RespostaEnum.NAO_CONCORDO_P;

    @Autowired
    private RespostaRepository respostaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRespostaMockMvc;

    private Resposta resposta;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        RespostaResource respostaResource = new RespostaResource(respostaRepository);
        this.restRespostaMockMvc = MockMvcBuilders.standaloneSetup(respostaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Resposta createEntity(EntityManager em) {
        Resposta resposta = new Resposta()
            .tipo(DEFAULT_TIPO);
        return resposta;
    }

    @Before
    public void initTest() {
        resposta = createEntity(em);
    }

    @Test
    @Transactional
    public void createResposta() throws Exception {
        int databaseSizeBeforeCreate = respostaRepository.findAll().size();

        // Create the Resposta
        restRespostaMockMvc.perform(post("/api/respostas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(resposta)))
            .andExpect(status().isCreated());

        // Validate the Resposta in the database
        List<Resposta> respostaList = respostaRepository.findAll();
        assertThat(respostaList).hasSize(databaseSizeBeforeCreate + 1);
        Resposta testResposta = respostaList.get(respostaList.size() - 1);
        assertThat(testResposta.getTipo()).isEqualTo(DEFAULT_TIPO);
    }

    @Test
    @Transactional
    public void createRespostaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = respostaRepository.findAll().size();

        // Create the Resposta with an existing ID
        resposta.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRespostaMockMvc.perform(post("/api/respostas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(resposta)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Resposta> respostaList = respostaRepository.findAll();
        assertThat(respostaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRespostas() throws Exception {
        // Initialize the database
        respostaRepository.saveAndFlush(resposta);

        // Get all the respostaList
        restRespostaMockMvc.perform(get("/api/respostas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(resposta.getId().intValue())))
            .andExpect(jsonPath("$.[*].tipo").value(hasItem(DEFAULT_TIPO.toString())));
    }

    @Test
    @Transactional
    public void getResposta() throws Exception {
        // Initialize the database
        respostaRepository.saveAndFlush(resposta);

        // Get the resposta
        restRespostaMockMvc.perform(get("/api/respostas/{id}", resposta.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(resposta.getId().intValue()))
            .andExpect(jsonPath("$.tipo").value(DEFAULT_TIPO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingResposta() throws Exception {
        // Get the resposta
        restRespostaMockMvc.perform(get("/api/respostas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateResposta() throws Exception {
        // Initialize the database
        respostaRepository.saveAndFlush(resposta);
        int databaseSizeBeforeUpdate = respostaRepository.findAll().size();

        // Update the resposta
        Resposta updatedResposta = respostaRepository.findOne(resposta.getId());
        updatedResposta
            .tipo(UPDATED_TIPO);

        restRespostaMockMvc.perform(put("/api/respostas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedResposta)))
            .andExpect(status().isOk());

        // Validate the Resposta in the database
        List<Resposta> respostaList = respostaRepository.findAll();
        assertThat(respostaList).hasSize(databaseSizeBeforeUpdate);
        Resposta testResposta = respostaList.get(respostaList.size() - 1);
        assertThat(testResposta.getTipo()).isEqualTo(UPDATED_TIPO);
    }

    @Test
    @Transactional
    public void updateNonExistingResposta() throws Exception {
        int databaseSizeBeforeUpdate = respostaRepository.findAll().size();

        // Create the Resposta

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRespostaMockMvc.perform(put("/api/respostas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(resposta)))
            .andExpect(status().isCreated());

        // Validate the Resposta in the database
        List<Resposta> respostaList = respostaRepository.findAll();
        assertThat(respostaList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteResposta() throws Exception {
        // Initialize the database
        respostaRepository.saveAndFlush(resposta);
        int databaseSizeBeforeDelete = respostaRepository.findAll().size();

        // Get the resposta
        restRespostaMockMvc.perform(delete("/api/respostas/{id}", resposta.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Resposta> respostaList = respostaRepository.findAll();
        assertThat(respostaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Resposta.class);
    }
}
