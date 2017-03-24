package br.edu.infnet.avalia10.repository;

import br.edu.infnet.avalia10.domain.Professor;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Professor entity.
 */
@SuppressWarnings("unused")
public interface ProfessorRepository extends JpaRepository<Professor,Long> {

}
