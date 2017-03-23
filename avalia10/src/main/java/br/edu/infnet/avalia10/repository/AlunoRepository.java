package br.edu.infnet.avalia10.repository;

import br.edu.infnet.avalia10.domain.Aluno;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Aluno entity.
 */
@SuppressWarnings("unused")
public interface AlunoRepository extends JpaRepository<Aluno,Long> {

}
