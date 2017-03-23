package br.edu.infnet.avalia10.repository;

import br.edu.infnet.avalia10.domain.Bloco;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Bloco entity.
 */
@SuppressWarnings("unused")
public interface BlocoRepository extends JpaRepository<Bloco,Long> {

}
