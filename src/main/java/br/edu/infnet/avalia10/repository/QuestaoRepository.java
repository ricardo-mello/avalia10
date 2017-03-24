package br.edu.infnet.avalia10.repository;

import br.edu.infnet.avalia10.domain.Questao;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Questao entity.
 */
@SuppressWarnings("unused")
public interface QuestaoRepository extends JpaRepository<Questao,Long> {

}
