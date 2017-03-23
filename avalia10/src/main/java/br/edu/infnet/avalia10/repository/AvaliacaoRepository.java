package br.edu.infnet.avalia10.repository;

import br.edu.infnet.avalia10.domain.Avaliacao;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Avaliacao entity.
 */
@SuppressWarnings("unused")
public interface AvaliacaoRepository extends JpaRepository<Avaliacao,Long> {

}
