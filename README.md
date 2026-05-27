# AgroRega Manager — GitHub Pages Demo

Demo estática da webapp AgroRega Manager, preparada para publicar em GitHub Pages.

## Conteúdo

- `index.html` — entrada principal da webapp
- `404.html` — fallback para GitHub Pages
- `assets/styles.css` — estilos responsivos para desktop e mobile
- `assets/app.js` — lógica da aplicação, dados demo e dashboard
- `manifest.json` — configuração PWA básica
- `.nojekyll` — evita processamento Jekyll no GitHub Pages

## Credenciais demo

- Utilizador: `admin`
- Palavra-passe: `admin123`

## Publicação no GitHub Pages

1. Criar um repositório no GitHub, por exemplo `agrorega-demo`.
2. Fazer upload de todos os ficheiros desta pasta para a raiz do repositório.
3. Ir a `Settings > Pages`.
4. Em `Build and deployment`, escolher `Deploy from a branch`.
5. Escolher branch `main` e pasta `/root`.
6. Guardar.

O link ficará no formato:

```text
https://O_TEU_UTILIZADOR.github.io/agrorega-demo/
```

Se o repositório se chamar exatamente `O_TEU_UTILIZADOR.github.io`, o link ficará:

```text
https://O_TEU_UTILIZADOR.github.io/
```

## Domínio profissional opcional

Exemplo:

```text
https://app.agrorega.pt
```

No GitHub, em `Settings > Pages > Custom domain`, coloca `app.agrorega.pt`. O GitHub pode criar/atualizar automaticamente o ficheiro `CNAME` na raiz do repositório quando usas publicação por branch.

Depois configura o DNS no fornecedor do domínio.

## Nota importante

Esta versão é uma demo estática. Os dados ficam no browser/localStorage. Não deve ser usada para dados reais de clientes sem backend, autenticação real e base de dados.
