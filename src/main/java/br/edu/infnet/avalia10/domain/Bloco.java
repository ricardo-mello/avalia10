package br.edu.infnet.avalia10.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Bloco.
 */
@Entity
@Table(name = "bloco")
public class Bloco implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "descricao", nullable = false)
    private String descricao;

    @ManyToOne
    private Curso curso;

    @OneToMany(mappedBy = "bloco")
    @JsonIgnore
    private Set<Modulo> modulos = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public Bloco descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Curso getCurso() {
        return curso;
    }

    public Bloco curso(Curso curso) {
        this.curso = curso;
        return this;
    }

    public void setCurso(Curso curso) {
        this.curso = curso;
    }

    public Set<Modulo> getModulos() {
        return modulos;
    }

    public Bloco modulos(Set<Modulo> modulos) {
        this.modulos = modulos;
        return this;
    }

    public Bloco addModulos(Modulo modulo) {
        this.modulos.add(modulo);
        modulo.setBloco(this);
        return this;
    }

    public Bloco removeModulos(Modulo modulo) {
        this.modulos.remove(modulo);
        modulo.setBloco(null);
        return this;
    }

    public void setModulos(Set<Modulo> modulos) {
        this.modulos = modulos;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Bloco bloco = (Bloco) o;
        if (bloco.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, bloco.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Bloco{" +
            "id=" + id +
            ", descricao='" + descricao + "'" +
            '}';
    }
}
