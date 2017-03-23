package br.edu.infnet.avalia10.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.edu.infnet.avalia10.domain.Resposta;

import br.edu.infnet.avalia10.repository.RespostaRepository;
import br.edu.infnet.avalia10.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Resposta.
 */
@RestController
@RequestMapping("/api")
public class RespostaResource {

    private final Logger log = LoggerFactory.getLogger(RespostaResource.class);

    private static final String ENTITY_NAME = "resposta";
        
    private final RespostaRepository respostaRepository;

    public RespostaResource(RespostaRepository respostaRepository) {
        this.respostaRepository = respostaRepository;
    }

    /**
     * POST  /respostas : Create a new resposta.
     *
     * @param resposta the resposta to create
     * @return the ResponseEntity with status 201 (Created) and with body the new resposta, or with status 400 (Bad Request) if the resposta has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/respostas")
    @Timed
    public ResponseEntity<Resposta> createResposta(@RequestBody Resposta resposta) throws URISyntaxException {
        log.debug("REST request to save Resposta : {}", resposta);
        if (resposta.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new resposta cannot already have an ID")).body(null);
        }
        Resposta result = respostaRepository.save(resposta);
        return ResponseEntity.created(new URI("/api/respostas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /respostas : Updates an existing resposta.
     *
     * @param resposta the resposta to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated resposta,
     * or with status 400 (Bad Request) if the resposta is not valid,
     * or with status 500 (Internal Server Error) if the resposta couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/respostas")
    @Timed
    public ResponseEntity<Resposta> updateResposta(@RequestBody Resposta resposta) throws URISyntaxException {
        log.debug("REST request to update Resposta : {}", resposta);
        if (resposta.getId() == null) {
            return createResposta(resposta);
        }
        Resposta result = respostaRepository.save(resposta);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, resposta.getId().toString()))
            .body(result);
    }

    /**
     * GET  /respostas : get all the respostas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of respostas in body
     */
    @GetMapping("/respostas")
    @Timed
    public List<Resposta> getAllRespostas() {
        log.debug("REST request to get all Respostas");
        List<Resposta> respostas = respostaRepository.findAll();
        return respostas;
    }

    /**
     * GET  /respostas/:id : get the "id" resposta.
     *
     * @param id the id of the resposta to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the resposta, or with status 404 (Not Found)
     */
    @GetMapping("/respostas/{id}")
    @Timed
    public ResponseEntity<Resposta> getResposta(@PathVariable Long id) {
        log.debug("REST request to get Resposta : {}", id);
        Resposta resposta = respostaRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(resposta));
    }

    /**
     * DELETE  /respostas/:id : delete the "id" resposta.
     *
     * @param id the id of the resposta to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/respostas/{id}")
    @Timed
    public ResponseEntity<Void> deleteResposta(@PathVariable Long id) {
        log.debug("REST request to delete Resposta : {}", id);
        respostaRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
