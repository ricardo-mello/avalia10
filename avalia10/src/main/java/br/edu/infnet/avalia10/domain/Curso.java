package br.edu.infnet.avalia10.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Curso.
 */
@Entity
@Table(name = "curso")
public class Curso implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "descricao", nullable = false)
    private String descricao;

    @OneToMany(mappedBy = "curso")
    @JsonIgnore
    private Set<Bloco> blocos = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public Curso descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Set<Bloco> getBlocos() {
        return blocos;
    }

    public Curso blocos(Set<Bloco> blocos) {
        this.blocos = blocos;
        return this;
    }

    public Curso addBlocos(Bloco bloco) {
        this.blocos.add(bloco);
        bloco.setCurso(this);
        return this;
    }

    public Curso removeBlocos(Bloco bloco) {
        this.blocos.remove(bloco);
        bloco.setCurso(null);
        return this;
    }

    public void setBlocos(Set<Bloco> blocos) {
        this.blocos = blocos;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Curso curso = (Curso) o;
        if (curso.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, curso.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Curso{" +
            "id=" + id +
            ", descricao='" + descricao + "'" +
            '}';
    }
}
