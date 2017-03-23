package br.edu.infnet.avalia10.web.rest;

import com.codahale.metrics.annotation.Timed;
import br.edu.infnet.avalia10.domain.Bloco;

import br.edu.infnet.avalia10.repository.BlocoRepository;
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
 * REST controller for managing Bloco.
 */
@RestController
@RequestMapping("/api")
public class BlocoResource {

    private final Logger log = LoggerFactory.getLogger(BlocoResource.class);

    private static final String ENTITY_NAME = "bloco";
        
    private final BlocoRepository blocoRepository;

    public BlocoResource(BlocoRepository blocoRepository) {
        this.blocoRepository = blocoRepository;
    }

    /**
     * POST  /blocos : Create a new bloco.
     *
     * @param bloco the bloco to create
     * @return the ResponseEntity with status 201 (Created) and with body the new bloco, or with status 400 (Bad Request) if the bloco has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/blocos")
    @Timed
    public ResponseEntity<Bloco> createBloco(@Valid @RequestBody Bloco bloco) throws URISyntaxException {
        log.debug("REST request to save Bloco : {}", bloco);
        if (bloco.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new bloco cannot already have an ID")).body(null);
        }
        Bloco result = blocoRepository.save(bloco);
        return ResponseEntity.created(new URI("/api/blocos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /blocos : Updates an existing bloco.
     *
     * @param bloco the bloco to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated bloco,
     * or with status 400 (Bad Request) if the bloco is not valid,
     * or with status 500 (Internal Server Error) if the bloco couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/blocos")
    @Timed
    public ResponseEntity<Bloco> updateBloco(@Valid @RequestBody Bloco bloco) throws URISyntaxException {
        log.debug("REST request to update Bloco : {}", bloco);
        if (bloco.getId() == null) {
            return createBloco(bloco);
        }
        Bloco result = blocoRepository.save(bloco);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, bloco.getId().toString()))
            .body(result);
    }

    /**
     * GET  /blocos : get all the blocos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of blocos in body
     */
    @GetMapping("/blocos")
    @Timed
    public List<Bloco> getAllBlocos() {
        log.debug("REST request to get all Blocos");
        List<Bloco> blocos = blocoRepository.findAll();
        return blocos;
    }

    /**
     * GET  /blocos/:id : get the "id" bloco.
     *
     * @param id the id of the bloco to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the bloco, or with status 404 (Not Found)
     */
    @GetMapping("/blocos/{id}")
    @Timed
    public ResponseEntity<Bloco> getBloco(@PathVariable Long id) {
        log.debug("REST request to get Bloco : {}", id);
        Bloco bloco = blocoRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(bloco));
    }

    /**
     * DELETE  /blocos/:id : delete the "id" bloco.
     *
     * @param id the id of the bloco to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/blocos/{id}")
    @Timed
    public ResponseEntity<Void> deleteBloco(@PathVariable Long id) {
        log.debug("REST request to delete Bloco : {}", id);
        blocoRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
