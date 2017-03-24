package br.edu.infnet.avalia10.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Modulo.
 */
@Entity
@Table(name = "modulo")
public class Modulo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "descricao", nullable = false)
    private String descricao;

    @ManyToOne
    private Bloco bloco;

    @OneToOne
    @JoinColumn(unique = true)
    private Professor professor;

    @OneToMany(mappedBy = "modulo")
    @JsonIgnore
    private Set<Turma> turmas = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public Modulo descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Bloco getBloco() {
        return bloco;
    }

    public Modulo bloco(Bloco bloco) {
        this.bloco = bloco;
        return this;
    }

    public void setBloco(Bloco bloco) {
        this.bloco = bloco;
    }

    public Professor getProfessor() {
        return professor;
    }

    public Modulo professor(Professor professor) {
        this.professor = professor;
        return this;
    }

    public void setProfessor(Professor professor) {
        this.professor = professor;
    }

    public Set<Turma> getTurmas() {
        return turmas;
    }

    public Modulo turmas(Set<Turma> turmas) {
        this.turmas = turmas;
        return this;
    }

    public Modulo addTurmas(Turma turma) {
        this.turmas.add(turma);
        turma.setModulo(this);
        return this;
    }

    public Modulo removeTurmas(Turma turma) {
        this.turmas.remove(turma);
        turma.setModulo(null);
        return this;
    }

    public void setTurmas(Set<Turma> turmas) {
        this.turmas = turmas;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Modulo modulo = (Modulo) o;
        if (modulo.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, modulo.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Modulo{" +
            "id=" + id +
            ", descricao='" + descricao + "'" +
            '}';
    }
}
