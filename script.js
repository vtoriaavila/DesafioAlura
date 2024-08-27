// Define a classe para criptografia e descriptografia
class Criptografia {
    constructor() {
        this.regrasAlura = {
            'e': 'enter',
            'i': 'imes',
            'a': 'ai',
            'o': 'ober',
            'u': 'ufat'
        };

        this.regrasInversasAlura = Object.fromEntries(
            Object.entries(this.regrasAlura).map(([chave, valor]) => [valor, chave])
        );

        this.deslocamentoCesar = 4;
    }

    // Função para criptografar com o método Alura
    criptografarAlura(texto) {
        return texto.split('').map(letra => this.regrasAlura[letra] || letra).join('');
    }

    // Função para descriptografar com o método Alura
    descriptografarAlura(texto) {
        let resultado = texto;
        for (let [chave, valor] of Object.entries(this.regrasInversasAlura)) {
            resultado = resultado.split(chave).join(valor);
        }
        return resultado;
    }

    // Função para criptografar com o método de César
    criptografarCesar(texto) {
        return texto.split('').map(letra => {
            if (letra >= 'a' && letra <= 'z') {
                let codigo = letra.charCodeAt(0);
                let novoCodigo = ((codigo - 97 + this.deslocamentoCesar) % 26) + 97;
                return String.fromCharCode(novoCodigo);
            }
            return letra;
        }).join('');
    }

    // Função para descriptografar com o método de César
    descriptografarCesar(texto) {
        return texto.split('').map(letra => {
            if (letra >= 'a' && letra <= 'z') {
                let codigo = letra.charCodeAt(0);
                let novoCodigo = ((codigo - 97 - this.deslocamentoCesar + 26) % 26) + 97;
                return String.fromCharCode(novoCodigo);
            }
            return letra;
        }).join('');
    }

    // Função para criptografar conforme o método selecionado
    criptografar(texto) {
        const metodo = document.querySelector('input[name="tipoCriptografia"]:checked').value;
        if (metodo === 'substitutivo') {
            return this.criptografarAlura(texto);
        } else if (metodo === 'cesar') {
            return this.criptografarCesar(texto);
        }
    }

    // Função para descriptografar conforme o método selecionado
    descriptografar(texto) {
        const metodo = document.querySelector('input[name="tipoCriptografia"]:checked').value;
        if (metodo === 'substitutivo') {
            return this.descriptografarAlura(texto);
        } else if (metodo === 'cesar') {
            return this.descriptografarCesar(texto);
        }
    }
}

// Lógica para manipulação dos eventos
document.addEventListener('DOMContentLoaded', () => {
    const criptografia = new Criptografia();

    const criptografarBtn = document.getElementById('criptografarBtn');
    const descriptografarBtn = document.getElementById('descriptografarBtn');
    const copiarBtn = document.getElementById('copiarBtn');
    const inputTexto = document.getElementById('inputTexto');
    const resultado = document.getElementById('resultado');
    const mensagemResultado = document.getElementById('mensagemResultado');

    function atualizarMensagemResultado() {
        if (resultado.value.trim() === '') {
            mensagemResultado.style.display = 'block';
        } else {
            mensagemResultado.style.display = 'none';
        }
    }

    criptografarBtn.addEventListener('click', () => {
        const texto = inputTexto.value;
        const resultadoTexto = criptografia.criptografar(texto);
        resultado.value = resultadoTexto;
        atualizarMensagemResultado();
    });

    descriptografarBtn.addEventListener('click', () => {
        const texto = inputTexto.value;
        const resultadoTexto = criptografia.descriptografar(texto);
        resultado.value = resultadoTexto;
        atualizarMensagemResultado();
    });

    copiarBtn.addEventListener('click', () => {
        resultado.select();
        document.execCommand('copy');
    });

    // Inicializa a mensagem de resultado
    atualizarMensagemResultado();
});
