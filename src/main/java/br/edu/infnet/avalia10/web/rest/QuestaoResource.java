package br.edu.infnet.avalia10.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.edu.infnet.avalia10.domain.Questao;

import br.edu.infnet.avalia10.repository.QuestaoRepository;
import br.edu.infnet.avalia10.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Questao.
 */
@RestController
@RequestMapping("/api")
public class QuestaoResource {

    private final Logger log = LoggerFactory.getLogger(QuestaoResource.class);

    private static final String ENTITY_NAME = "questao";
        
    private final QuestaoRepository questaoRepository;

    public QuestaoResource(QuestaoRepository questaoRepository) {
        this.questaoRepository = questaoRepository;
    }

    /**
     * POST  /questaos : Create a new questao.
     *
     * @param questao the questao to create
     * @return the ResponseEntity with status 201 (Created) and with body the new questao, or with status 400 (Bad Request) if the questao has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/questaos")
    @Timed
    public ResponseEntity<Questao> createQuestao(@Valid @RequestBody Questao questao) throws URISyntaxException {
        log.debug("REST request to save Questao : {}", questao);
        if (questao.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new questao cannot already have an ID")).body(null);
        }
        Questao result = questaoRepository.save(questao);
        return ResponseEntity.created(new URI("/api/questaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /questaos : Updates an existing questao.
     *
     * @param questao the questao to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated questao,
     * or with status 400 (Bad Request) if the questao is not valid,
     * or with status 500 (Internal Server Error) if the questao couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/questaos")
    @Timed
    public ResponseEntity<Questao> updateQuestao(@Valid @RequestBody Questao questao) throws URISyntaxException {
        log.debug("REST request to update Questao : {}", questao);
        if (questao.getId() == null) {
            return createQuestao(questao);
        }
        Questao result = questaoRepository.save(questao);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, questao.getId().toString()))
            .body(result);
    }

    /**
     * GET  /questaos : get all the questaos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of questaos in body
     */
    @GetMapping("/questaos")
    @Timed
    public List<Questao> getAllQuestaos() {
        log.debug("REST request to get all Questaos");
        List<Questao> questaos = questaoRepository.findAll();
        return questaos;
    }

    /**
     * GET  /questaos/:id : get the "id" questao.
     *
     * @param id the id of the questao to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the questao, or with status 404 (Not Found)
     */
    @GetMapping("/questaos/{id}")
    @Timed
    public ResponseEntity<Questao> getQuestao(@PathVariable Long id) {
        log.debug("REST request to get Questao : {}", id);
        Questao questao = questaoRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(questao));
    }

    /**
     * DELETE  /questaos/:id : delete the "id" questao.
     *
     * @param id the id of the questao to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/questaos/{id}")
    @Timed
    public ResponseEntity<Void> deleteQuestao(@PathVariable Long id) {
        log.debug("REST request to delete Questao : {}", id);
        questaoRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
