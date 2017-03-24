package br.edu.infnet.avalia10.web.rest;

import br.edu.infnet.avalia10.Avalia10App;

import br.edu.infnet.avalia10.domain.Questao;
import br.edu.infnet.avalia10.repository.QuestaoRepository;
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
 * Test class for the QuestaoResource REST controller.
 *
 * @see QuestaoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Avalia10App.class)
public class QuestaoResourceIntTest {

    private static final String DEFAULT_TEXTO = "AAAAAAAAAA";
    private static final String UPDATED_TEXTO = "BBBBBBBBBB";

    private static final Integer DEFAULT_ORDEM = 1;
    private static final Integer UPDATED_ORDEM = 2;

    private static final LocalDate DEFAULT_DATA_EXCLUSAO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA_EXCLUSAO = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private QuestaoRepository questaoRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restQuestaoMockMvc;

    private Questao questao;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        QuestaoResource questaoResource = new QuestaoResource(questaoRepository);
        this.restQuestaoMockMvc = MockMvcBuilders.standaloneSetup(questaoResource)
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
    public static Questao createEntity(EntityManager em) {
        Questao questao = new Questao()
            .texto(DEFAULT_TEXTO)
            .ordem(DEFAULT_ORDEM)
            .dataExclusao(DEFAULT_DATA_EXCLUSAO);
        return questao;
    }

    @Before
    public void initTest() {
        questao = createEntity(em);
    }

    @Test
    @Transactional
    public void createQuestao() throws Exception {
        int databaseSizeBeforeCreate = questaoRepository.findAll().size();

        // Create the Questao
        restQuestaoMockMvc.perform(post("/api/questaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(questao)))
            .andExpect(status().isCreated());

        // Validate the Questao in the database
        List<Questao> questaoList = questaoRepository.findAll();
        assertThat(questaoList).hasSize(databaseSizeBeforeCreate + 1);
        Questao testQuestao = questaoList.get(questaoList.size() - 1);
        assertThat(testQuestao.getTexto()).isEqualTo(DEFAULT_TEXTO);
        assertThat(testQuestao.getOrdem()).isEqualTo(DEFAULT_ORDEM);
        assertThat(testQuestao.getDataExclusao()).isEqualTo(DEFAULT_DATA_EXCLUSAO);
    }

    @Test
    @Transactional
    public void createQuestaoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = questaoRepository.findAll().size();

        // Create the Questao with an existing ID
        questao.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restQuestaoMockMvc.perform(post("/api/questaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(questao)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Questao> questaoList = questaoRepository.findAll();
        assertThat(questaoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkTextoIsRequired() throws Exception {
        int databaseSizeBeforeTest = questaoRepository.findAll().size();
        // set the field null
        questao.setTexto(null);

        // Create the Questao, which fails.

        restQuestaoMockMvc.perform(post("/api/questaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(questao)))
            .andExpect(status().isBadRequest());

        List<Questao> questaoList = questaoRepository.findAll();
        assertThat(questaoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllQuestaos() throws Exception {
        // Initialize the database
        questaoRepository.saveAndFlush(questao);

        // Get all the questaoList
        restQuestaoMockMvc.perform(get("/api/questaos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(questao.getId().intValue())))
            .andExpect(jsonPath("$.[*].texto").value(hasItem(DEFAULT_TEXTO.toString())))
            .andExpect(jsonPath("$.[*].ordem").value(hasItem(DEFAULT_ORDEM)))
            .andExpect(jsonPath("$.[*].dataExclusao").value(hasItem(DEFAULT_DATA_EXCLUSAO.toString())));
    }

    @Test
    @Transactional
    public void getQuestao() throws Exception {
        // Initialize the database
        questaoRepository.saveAndFlush(questao);

        // Get the questao
        restQuestaoMockMvc.perform(get("/api/questaos/{id}", questao.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(questao.getId().intValue()))
            .andExpect(jsonPath("$.texto").value(DEFAULT_TEXTO.toString()))
            .andExpect(jsonPath("$.ordem").value(DEFAULT_ORDEM))
            .andExpect(jsonPath("$.dataExclusao").value(DEFAULT_DATA_EXCLUSAO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingQuestao() throws Exception {
        // Get the questao
        restQuestaoMockMvc.perform(get("/api/questaos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateQuestao() throws Exception {
        // Initialize the database
        questaoRepository.saveAndFlush(questao);
        int databaseSizeBeforeUpdate = questaoRepository.findAll().size();

        // Update the questao
        Questao updatedQuestao = questaoRepository.findOne(questao.getId());
        updatedQuestao
            .texto(UPDATED_TEXTO)
            .ordem(UPDATED_ORDEM)
            .dataExclusao(UPDATED_DATA_EXCLUSAO);

        restQuestaoMockMvc.perform(put("/api/questaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedQuestao)))
            .andExpect(status().isOk());

        // Validate the Questao in the database
        List<Questao> questaoList = questaoRepository.findAll();
        assertThat(questaoList).hasSize(databaseSizeBeforeUpdate);
        Questao testQuestao = questaoList.get(questaoList.size() - 1);
        assertThat(testQuestao.getTexto()).isEqualTo(UPDATED_TEXTO);
        assertThat(testQuestao.getOrdem()).isEqualTo(UPDATED_ORDEM);
        assertThat(testQuestao.getDataExclusao()).isEqualTo(UPDATED_DATA_EXCLUSAO);
    }

    @Test
    @Transactional
    public void updateNonExistingQuestao() throws Exception {
        int databaseSizeBeforeUpdate = questaoRepository.findAll().size();

        // Create the Questao

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restQuestaoMockMvc.perform(put("/api/questaos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(questao)))
            .andExpect(status().isCreated());

        // Validate the Questao in the database
        List<Questao> questaoList = questaoRepository.findAll();
        assertThat(questaoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteQuestao() throws Exception {
        // Initialize the database
        questaoRepository.saveAndFlush(questao);
        int databaseSizeBeforeDelete = questaoRepository.findAll().size();

        // Get the questao
        restQuestaoMockMvc.perform(delete("/api/questaos/{id}", questao.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Questao> questaoList = questaoRepository.findAll();
        assertThat(questaoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Questao.class);
    }
}
