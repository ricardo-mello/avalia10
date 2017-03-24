package br.edu.infnet.avalia10.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Avaliacao.
 */
@Entity
@Table(name = "avaliacao")
public class Avaliacao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "codigo", nullable = false)
    private String codigo;

    @NotNull
    @Column(name = "objetivo", nullable = false)
    private String objetivo;

    @Column(name = "data_inicio")
    private LocalDate dataInicio;

    @Column(name = "data_termino")
    private LocalDate dataTermino;

    @Column(name = "texto_email")
    private String textoEmail;

    @OneToOne
    @JoinColumn(unique = true)
    private Aluno aluno;

    @OneToOne
    @JoinColumn(unique = true)
    private Modulo modulo;

    @OneToOne
    @JoinColumn(unique = true)
    private Turma turma;

    @OneToOne
    @JoinColumn(unique = true)
    private Professor professor;

    @OneToMany(mappedBy = "avaliacao")
    @JsonIgnore
    private Set<Questao> questoes = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public Avaliacao codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getObjetivo() {
        return objetivo;
    }

    public Avaliacao objetivo(String objetivo) {
        this.objetivo = objetivo;
        return this;
    }

    public void setObjetivo(String objetivo) {
        this.objetivo = objetivo;
    }

    public LocalDate getDataInicio() {
        return dataInicio;
    }

    public Avaliacao dataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
        return this;
    }

    public void setDataInicio(LocalDate dataInicio) {
        this.dataInicio = dataInicio;
    }

    public LocalDate getDataTermino() {
        return dataTermino;
    }

    public Avaliacao dataTermino(LocalDate dataTermino) {
        this.dataTermino = dataTermino;
        return this;
    }

    public void setDataTermino(LocalDate dataTermino) {
        this.dataTermino = dataTermino;
    }

    public String getTextoEmail() {
        return textoEmail;
    }

    public Avaliacao textoEmail(String textoEmail) {
        this.textoEmail = textoEmail;
        return this;
    }

    public void setTextoEmail(String textoEmail) {
        this.textoEmail = textoEmail;
    }

    public Aluno getAluno() {
        return aluno;
    }

    public Avaliacao aluno(Aluno aluno) {
        this.aluno = aluno;
        return this;
    }

    public void setAluno(Aluno aluno) {
        this.aluno = aluno;
    }

    public Modulo getModulo() {
        return modulo;
    }

    public Avaliacao modulo(Modulo modulo) {
        this.modulo = modulo;
        return this;
    }

    public void setModulo(Modulo modulo) {
        this.modulo = modulo;
    }

    public Turma getTurma() {
        return turma;
    }

    public Avaliacao turma(Turma turma) {
        this.turma = turma;
        return this;
    }

    public void setTurma(Turma turma) {
        this.turma = turma;
    }

    public Professor getProfessor() {
        return professor;
    }

    public Avaliacao professor(Professor professor) {
        this.professor = professor;
        return this;
    }

    public void setProfessor(Professor professor) {
        this.professor = professor;
    }

    public Set<Questao> getQuestoes() {
        return questoes;
    }

    public Avaliacao questoes(Set<Questao> questaos) {
        this.questoes = questaos;
        return this;
    }

    public Avaliacao addQuestoes(Questao questao) {
        this.questoes.add(questao);
        questao.setAvaliacao(this);
        return this;
    }

    public Avaliacao removeQuestoes(Questao questao) {
        this.questoes.remove(questao);
        questao.setAvaliacao(null);
        return this;
    }

    public void setQuestoes(Set<Questao> questaos) {
        this.questoes = questaos;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Avaliacao avaliacao = (Avaliacao) o;
        if (avaliacao.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, avaliacao.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Avaliacao{" +
            "id=" + id +
            ", codigo='" + codigo + "'" +
            ", objetivo='" + objetivo + "'" +
            ", dataInicio='" + dataInicio + "'" +
            ", dataTermino='" + dataTermino + "'" +
            ", textoEmail='" + textoEmail + "'" +
            '}';
    }
}
