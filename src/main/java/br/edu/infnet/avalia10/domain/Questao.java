package br.edu.infnet.avalia10.domain;


import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Questao.
 */
@Entity
@Table(name = "questao")
public class Questao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "texto", nullable = false)
    private String texto;

    @Column(name = "ordem")
    private Integer ordem;

    @Column(name = "data_exclusao")
    private LocalDate dataExclusao;

    @ManyToOne
    private Avaliacao avaliacao;

    @OneToOne
    @JoinColumn(unique = true)
    private Resposta resposta;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTexto() {
        return texto;
    }

    public Questao texto(String texto) {
        this.texto = texto;
        return this;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public Integer getOrdem() {
        return ordem;
    }

    public Questao ordem(Integer ordem) {
        this.ordem = ordem;
        return this;
    }

    public void setOrdem(Integer ordem) {
        this.ordem = ordem;
    }

    public LocalDate getDataExclusao() {
        return dataExclusao;
    }

    public Questao dataExclusao(LocalDate dataExclusao) {
        this.dataExclusao = dataExclusao;
        return this;
    }

    public void setDataExclusao(LocalDate dataExclusao) {
        this.dataExclusao = dataExclusao;
    }

    public Avaliacao getAvaliacao() {
        return avaliacao;
    }

    public Questao avaliacao(Avaliacao avaliacao) {
        this.avaliacao = avaliacao;
        return this;
    }

    public void setAvaliacao(Avaliacao avaliacao) {
        this.avaliacao = avaliacao;
    }

    public Resposta getResposta() {
        return resposta;
    }

    public Questao resposta(Resposta resposta) {
        this.resposta = resposta;
        return this;
    }

    public void setResposta(Resposta resposta) {
        this.resposta = resposta;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Questao questao = (Questao) o;
        if (questao.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, questao.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Questao{" +
            "id=" + id +
            ", texto='" + texto + "'" +
            ", ordem='" + ordem + "'" +
            ", dataExclusao='" + dataExclusao + "'" +
            '}';
    }
}
