package br.edu.infnet.avalia10.repository;

import br.edu.infnet.avalia10.domain.Curso;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Curso entity.
 */
@SuppressWarnings("unused")
public interface CursoRepository extends JpaRepository<Curso,Long> {

}
