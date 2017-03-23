package br.edu.infnet.avalia10.repository;

import br.edu.infnet.avalia10.domain.Modulo;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Modulo entity.
 */
@SuppressWarnings("unused")
public interface ModuloRepository extends JpaRepository<Modulo,Long> {

}
