package br.edu.infnet.avalia10.web.rest;

import br.edu.infnet.avalia10.Avalia10App;

import br.edu.infnet.avalia10.domain.Modulo;
import br.edu.infnet.avalia10.repository.ModuloRepository;
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

/**
 * Test class for the ModuloResource REST controller.
 *
 * @see ModuloResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Avalia10App.class)
public class ModuloResourceIntTest {

    private static final String DEFAULT_DESCRICAO = "AAAAAAAAAA";
    private static final String UPDATED_DESCRICAO = "BBBBBBBBBB";

    @Autowired
    private ModuloRepository moduloRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restModuloMockMvc;

    private Modulo modulo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        ModuloResource moduloResource = new ModuloResource(moduloRepository);
        this.restModuloMockMvc = MockMvcBuilders.standaloneSetup(moduloResource)
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
    public static Modulo createEntity(EntityManager em) {
        Modulo modulo = new Modulo()
            .descricao(DEFAULT_DESCRICAO);
        return modulo;
    }

    @Before
    public void initTest() {
        modulo = createEntity(em);
    }

    @Test
    @Transactional
    public void createModulo() throws Exception {
        int databaseSizeBeforeCreate = moduloRepository.findAll().size();

        // Create the Modulo
        restModuloMockMvc.perform(post("/api/modulos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modulo)))
            .andExpect(status().isCreated());

        // Validate the Modulo in the database
        List<Modulo> moduloList = moduloRepository.findAll();
        assertThat(moduloList).hasSize(databaseSizeBeforeCreate + 1);
        Modulo testModulo = moduloList.get(moduloList.size() - 1);
        assertThat(testModulo.getDescricao()).isEqualTo(DEFAULT_DESCRICAO);
    }

    @Test
    @Transactional
    public void createModuloWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = moduloRepository.findAll().size();

        // Create the Modulo with an existing ID
        modulo.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restModuloMockMvc.perform(post("/api/modulos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modulo)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Modulo> moduloList = moduloRepository.findAll();
        assertThat(moduloList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDescricaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = moduloRepository.findAll().size();
        // set the field null
        modulo.setDescricao(null);

        // Create the Modulo, which fails.

        restModuloMockMvc.perform(post("/api/modulos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modulo)))
            .andExpect(status().isBadRequest());

        List<Modulo> moduloList = moduloRepository.findAll();
        assertThat(moduloList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllModulos() throws Exception {
        // Initialize the database
        moduloRepository.saveAndFlush(modulo);

        // Get all the moduloList
        restModuloMockMvc.perform(get("/api/modulos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(modulo.getId().intValue())))
            .andExpect(jsonPath("$.[*].descricao").value(hasItem(DEFAULT_DESCRICAO.toString())));
    }

    @Test
    @Transactional
    public void getModulo() throws Exception {
        // Initialize the database
        moduloRepository.saveAndFlush(modulo);

        // Get the modulo
        restModuloMockMvc.perform(get("/api/modulos/{id}", modulo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(modulo.getId().intValue()))
            .andExpect(jsonPath("$.descricao").value(DEFAULT_DESCRICAO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingModulo() throws Exception {
        // Get the modulo
        restModuloMockMvc.perform(get("/api/modulos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateModulo() throws Exception {
        // Initialize the database
        moduloRepository.saveAndFlush(modulo);
        int databaseSizeBeforeUpdate = moduloRepository.findAll().size();

        // Update the modulo
        Modulo updatedModulo = moduloRepository.findOne(modulo.getId());
        updatedModulo
            .descricao(UPDATED_DESCRICAO);

        restModuloMockMvc.perform(put("/api/modulos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedModulo)))
            .andExpect(status().isOk());

        // Validate the Modulo in the database
        List<Modulo> moduloList = moduloRepository.findAll();
        assertThat(moduloList).hasSize(databaseSizeBeforeUpdate);
        Modulo testModulo = moduloList.get(moduloList.size() - 1);
        assertThat(testModulo.getDescricao()).isEqualTo(UPDATED_DESCRICAO);
    }

    @Test
    @Transactional
    public void updateNonExistingModulo() throws Exception {
        int databaseSizeBeforeUpdate = moduloRepository.findAll().size();

        // Create the Modulo

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restModuloMockMvc.perform(put("/api/modulos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(modulo)))
            .andExpect(status().isCreated());

        // Validate the Modulo in the database
        List<Modulo> moduloList = moduloRepository.findAll();
        assertThat(moduloList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteModulo() throws Exception {
        // Initialize the database
        moduloRepository.saveAndFlush(modulo);
        int databaseSizeBeforeDelete = moduloRepository.findAll().size();

        // Get the modulo
        restModuloMockMvc.perform(delete("/api/modulos/{id}", modulo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Modulo> moduloList = moduloRepository.findAll();
        assertThat(moduloList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Modulo.class);
    }
}
