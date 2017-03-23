package br.edu.infnet.avalia10.domain;


import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

import br.edu.infnet.avalia10.domain.enumeration.RespostaEnum;

/**
 * A Resposta.
 */
@Entity
@Table(name = "resposta")
public class Resposta implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo")
    private RespostaEnum tipo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RespostaEnum getTipo() {
        return tipo;
    }

    public Resposta tipo(RespostaEnum tipo) {
        this.tipo = tipo;
        return this;
    }

    public void setTipo(RespostaEnum tipo) {
        this.tipo = tipo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Resposta resposta = (Resposta) o;
        if (resposta.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, resposta.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Resposta{" +
            "id=" + id +
            ", tipo='" + tipo + "'" +
            '}';
    }
}
