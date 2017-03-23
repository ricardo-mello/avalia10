package br.edu.infnet.avalia10.repository;

import br.edu.infnet.avalia10.domain.Turma;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Turma entity.
 */
@SuppressWarnings("unused")
public interface TurmaRepository extends JpaRepository<Turma,Long> {

}
