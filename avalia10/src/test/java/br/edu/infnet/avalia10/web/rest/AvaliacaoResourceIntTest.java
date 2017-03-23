package br.edu.infnet.avalia10.web.rest;

import br.edu.infnet.avalia10.Avalia10App;

import br.edu.infnet.avalia10.domain.Avaliacao;
import br.edu.infnet.avalia10.repository.AvaliacaoRepository;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AvaliacaoResource REST controller.
 *
 * @see AvaliacaoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Avalia10App.class)
public class AvaliacaoResourceIntTest {

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final String DEFAULT_OBJETIVO = "AAAAAAAAAA";
    private static final String UPDATED_OBJETIVO = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATA_INICIO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_INICIO = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATA_TERMINO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_TERMINO = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_TEXTO_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_TEXTO_EMAIL = "BBBBBBBBBB";

    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restAvaliacaoMockMvc;

    private Avaliacao avaliacao;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        AvaliacaoResource avaliacaoResource = new AvaliacaoResource(avaliacaoRepository);
        this.restAvaliacaoMockMvc = MockMvcBuilders.standaloneSetup(avaliacaoResource)
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
    public static Avaliacao createEntity(EntityManager em) {
        Avaliacao avaliacao = new Avaliacao()
            .codigo(DEFAULT_CODIGO)
            .objetivo(DEFAULT_OBJETIVO)
            .dataInicio(DEFAULT_DATA_INICIO)
            .dataTermino(DEFAULT_DATA_TERMINO)
            .textoEmail(DEFAULT_TEXTO_EMAIL);
        return avaliacao;
    }

    @Before
    public void initTest() {
        avaliacao = createEntity(em);
    }

    @Test
    @Transactional
    public void createAvaliacao() throws Exception {
        int databaseSizeBeforeCreate = avaliacaoRepository.findAll().size();

        // Create the Avaliacao
        restAvaliacaoMockMvc.perform(post("/api/avaliacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(avaliacao)))
            .andExpect(status().isCreated());

        // Validate the Avaliacao in the database
        List<Avaliacao> avaliacaoList = avaliacaoRepository.findAll();
        assertThat(avaliacaoList).hasSize(databaseSizeBeforeCreate + 1);
        Avaliacao testAvaliacao = avaliacaoList.get(avaliacaoList.size() - 1);
        assertThat(testAvaliacao.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testAvaliacao.getObjetivo()).isEqualTo(DEFAULT_OBJETIVO);
        assertThat(testAvaliacao.getDataInicio()).isEqualTo(DEFAULT_DATA_INICIO);
        assertThat(testAvaliacao.getDataTermino()).isEqualTo(DEFAULT_DATA_TERMINO);
        assertThat(testAvaliacao.getTextoEmail()).isEqualTo(DEFAULT_TEXTO_EMAIL);
    }

    @Test
    @Transactional
    public void createAvaliacaoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = avaliacaoRepository.findAll().size();

        // Create the Avaliacao with an existing ID
        avaliacao.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAvaliacaoMockMvc.perform(post("/api/avaliacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(avaliacao)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Avaliacao> avaliacaoList = avaliacaoRepository.findAll();
        assertThat(avaliacaoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkCodigoIsRequired() throws Exception {
        int databaseSizeBeforeTest = avaliacaoRepository.findAll().size();
        // set the field null
        avaliacao.setCodigo(null);

        // Create the Avaliacao, which fails.

        restAvaliacaoMockMvc.perform(post("/api/avaliacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(avaliacao)))
            .andExpect(status().isBadRequest());

        List<Avaliacao> avaliacaoList = avaliacaoRepository.findAll();
        assertThat(avaliacaoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkObjetivoIsRequired() throws Exception {
        int databaseSizeBeforeTest = avaliacaoRepository.findAll().size();
        // set the field null
        avaliacao.setObjetivo(null);

        // Create the Avaliacao, which fails.

        restAvaliacaoMockMvc.perform(post("/api/avaliacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(avaliacao)))
            .andExpect(status().isBadRequest());

        List<Avaliacao> avaliacaoList = avaliacaoRepository.findAll();
        assertThat(avaliacaoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllAvaliacaos() throws Exception {
        // Initialize the database
        avaliacaoRepository.saveAndFlush(avaliacao);

        // Get all the avaliacaoList
        restAvaliacaoMockMvc.perform(get("/api/avaliacaos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(avaliacao.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.toString())))
            .andExpect(jsonPath("$.[*].objetivo").value(hasItem(DEFAULT_OBJETIVO.toString())))
            .andExpect(jsonPath("$.[*].dataInicio").value(hasItem(DEFAULT_DATA_INICIO.toString())))
            .andExpect(jsonPath("$.[*].dataTermino").value(hasItem(DEFAULT_DATA_TERMINO.toString())))
            .andExpect(jsonPath("$.[*].textoEmail").value(hasItem(DEFAULT_TEXTO_EMAIL.toString())));
    }

    @Test
    @Transactional
    public void getAvaliacao() throws Exception {
        // Initialize the database
        avaliacaoRepository.saveAndFlush(avaliacao);

        // Get the avaliacao
        restAvaliacaoMockMvc.perform(get("/api/avaliacaos/{id}", avaliacao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(avaliacao.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.toString()))
            .andExpect(jsonPath("$.objetivo").value(DEFAULT_OBJETIVO.toString()))
            .andExpect(jsonPath("$.dataInicio").value(DEFAULT_DATA_INICIO.toString()))
            .andExpect(jsonPath("$.dataTermino").value(DEFAULT_DATA_TERMINO.toString()))
            .andExpect(jsonPath("$.textoEmail").value(DEFAULT_TEXTO_EMAIL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingAvaliacao() throws Exception {
        // Get the avaliacao
        restAvaliacaoMockMvc.perform(get("/api/avaliacaos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAvaliacao() throws Exception {
        // Initialize the database
        avaliacaoRepository.saveAndFlush(avaliacao);
        int databaseSizeBeforeUpdate = avaliacaoRepository.findAll().size();

        // Update the avaliacao
        Avaliacao updatedAvaliacao = avaliacaoRepository.findOne(avaliacao.getId());
        updatedAvaliacao
            .codigo(UPDATED_CODIGO)
            .objetivo(UPDATED_OBJETIVO)
            .dataInicio(UPDATED_DATA_INICIO)
            .dataTermino(UPDATED_DATA_TERMINO)
            .textoEmail(UPDATED_TEXTO_EMAIL);

        restAvaliacaoMockMvc.perform(put("/api/avaliacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAvaliacao)))
            .andExpect(status().isOk());

        // Validate the Avaliacao in the database
        List<Avaliacao> avaliacaoList = avaliacaoRepository.findAll();
        assertThat(avaliacaoList).hasSize(databaseSizeBeforeUpdate);
        Avaliacao testAvaliacao = avaliacaoList.get(avaliacaoList.size() - 1);
        assertThat(testAvaliacao.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testAvaliacao.getObjetivo()).isEqualTo(UPDATED_OBJETIVO);
        assertThat(testAvaliacao.getDataInicio()).isEqualTo(UPDATED_DATA_INICIO);
        assertThat(testAvaliacao.getDataTermino()).isEqualTo(UPDATED_DATA_TERMINO);
        assertThat(testAvaliacao.getTextoEmail()).isEqualTo(UPDATED_TEXTO_EMAIL);
    }

    @Test
    @Transactional
    public void updateNonExistingAvaliacao() throws Exception {
        int databaseSizeBeforeUpdate = avaliacaoRepository.findAll().size();

        // Create the Avaliacao

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restAvaliacaoMockMvc.perform(put("/api/avaliacaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(avaliacao)))
            .andExpect(status().isCreated());

        // Validate the Avaliacao in the database
        List<Avaliacao> avaliacaoList = avaliacaoRepository.findAll();
        assertThat(avaliacaoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteAvaliacao() throws Exception {
        // Initialize the database
        avaliacaoRepository.saveAndFlush(avaliacao);
        int databaseSizeBeforeDelete = avaliacaoRepository.findAll().size();

        // Get the avaliacao
        restAvaliacaoMockMvc.perform(delete("/api/avaliacaos/{id}", avaliacao.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Avaliacao> avaliacaoList = avaliacaoRepository.findAll();
        assertThat(avaliacaoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Avaliacao.class);
    }
}
