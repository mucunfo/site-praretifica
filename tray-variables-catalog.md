# CATÁLOGO COMPLETO DE VARIÁVEIS TRAY - DOCUMENTAÇÃO DE REFERÊNCIA

## 📋 RESUMO EXECUTIVO
- **Arquivos analisados:** 42 arquivos HTML
- **Variáveis identificadas:** 150+ variáveis únicas
- **Categorias principais:** 8 grupos funcionais
- **Contextos de uso:** Global, Produto, Carrinho, Usuário, Sistema

---

## 🗂️ TABELA DE REFERÊNCIA RÁPIDA

| Variável | Tipo | Contexto | Exemplo | Arquivos |
|----------|------|----------|---------|----------|
| `{{ store.id }}` | string | Global | `<meta data-store="{{ store.id }}">` | layouts/*, elements/* |
| `{{ store.name }}` | string | Global | `<h1>{{ store.name }}</h1>` | elements/header.html |
| `{{ settings.currency }}` | string | Global | `<span>{{ settings.currency }}</span>` | elements/*, snippets/* |
| `{{ settings.color_icons }}` | string | Global | `<svg fill="{{ settings.color_icons }}">` | elements/header.html |
| `{{ pages.current }}` | string | Global | `<body class="page-{{ pages.current }}">` | layouts/default.html |
| `{{ links.home }}` | string | Global | `<a href="{{ links.home }}">` | elements/header.html |
| `{{ links.cart }}` | string | Global | `<a href="{{ links.cart }}">` | elements/snippets/cart.html |
| `{{ Translation('login') }}` | string | Global | `<span>{{ Translation('login') }}</span>` | elements/header.html |
| `{{ product.name }}` | string | Produto | `<h1>{{ product.name }}</h1>` | pages/product.html |
| `{{ product.price }}` | number | Produto | `<span>{{ product.price\|currency }}</span>` | snippets/price.html |
| `{{ product.id }}` | number | Produto | `<meta content="{{ product.id }}">` | snippets/product.html |
| `{{ cart.amount }}` | number | Carrinho | `<span>{{ cart.amount }}</span>` | elements/header.html |
| `{{ cart.price }}` | number | Carrinho | `<span>{{ cart.price }}</span>` | elements/snippets/cart.html |
| `{{ category.name }}` | string | Categoria | `<h1>{{ category.name }}</h1>` | pages/catalog.html |
| `{{ category.id }}` | number | Categoria | `<input value="{{ category.id }}">` | elements/smartfilter.html |

---

## 🌐 1. VARIÁVEIS GLOBAIS

### 1.1 Store (Loja)
```markdown
{{ store.id }}          # ID da loja (string)
{{ store.name }}        # Nome da loja (string)
{{ store.chat }}        # Código do chat (string)
```

**Contexto:** Todas as páginas
**Arquivos:** layouts/default.html, elements/header.html, elements/smartfilter.html

### 1.2 Settings (Configurações)
```markdown
{{ settings.currency }}           # Moeda (string)
{{ settings.color_icons }}        # Cor dos ícones (string)
{{ settings.extension_id }}       # ID da extensão (string)
{{ settings.background_image }}   # Imagem de fundo (string)
{{ settings.show_menu_title }}    # Mostrar título do menu (boolean)
{{ settings.compare }}            # Habilitar comparação (boolean)
{{ settings.discount }}           # Mostrar desconto (boolean)
{{ settings.social_facebook }}    # Facebook (string)
{{ settings.social_twitter }}     # Twitter (string)
{{ settings.social_instagram }}   # Instagram (string)
{{ settings.social_youtube }}     # YouTube (string)
{{ settings.social_pinterest }}   # Pinterest (string)
{{ settings.whatsapp }}           # WhatsApp (string)
{{ settings.enable_seal }}        # Habilitar selo (boolean)
{{ settings.seal_code }}          # Código do selo (string)
{{ settings.without_stock_sale }} # Venda sem estoque (boolean)
{{ settings.show_available_products }} # Mostrar produtos disponíveis (boolean)
{{ settings.limitProducts }}      # Limite de produtos (number)
{{ settings.showcase }}           # Tipo de vitrine (string)
{{ settings.history_position }}   # Posição do histórico (number)
{{ settings.hottags_position }}   # Posição das tags (number)
{{ settings.cache_infopreco }}    # Cache de preços (boolean)
{{ settings.buy_to_cart }}        # Comprar direto no carrinho (boolean)
{{ settings.show_product_stock }} # Mostrar estoque (boolean)
{{ settings.social_position }}    # Posição das redes sociais (number)
{{ settings.price_before_style }} # Estilo do preço anterior (string)
```

**Contexto:** Todas as páginas, controle de exibição
**Arquivos:** elements/header.html, elements/footer.html, elements/snippets/price.html

### 1.3 Pages (Páginas)
```markdown
{{ pages.current }}     # Página atual (string)
{{ pages.custom }}      # Páginas customizadas (array)
```

**Contexto:** Todas as páginas, navegação
**Arquivos:** layouts/default.html, elements/header.html, elements/footer.html

### 1.4 Links (Links)
```markdown
{{ links.home }}              # Página inicial (string)
{{ links.cart }}              # Carrinho (string)
{{ links.login }}             # Login (string)
{{ links.search }}            # Busca (string)
{{ links.contact }}           # Contato (string)
{{ links.newsletter }}        # Newsletter (string)
{{ links.compare_add }}       # Adicionar comparação (string)
{{ links.compare_delete }}    # Remover comparação (string)
{{ links.product_recommend }} # Recomendar produto (string)
{{ links.product_question }}  # Perguntar sobre produto (string)
```

**Contexto:** Todas as páginas, navegação
**Arquivos:** elements/header.html, elements/footer.html, elements/snippets/cart.html

### 1.5 Translation (Traduções)
```markdown
{{ Translation('login') }}              # Login
{{ Translation('buscar') }}             # Buscar
{{ Translation('itens') }}              # Itens
{{ Translation('contato') }}            # Contato
{{ Translation('institucional') }}      # Institucional
{{ Translation('redes_sociais') }}      # Redes Sociais
{{ Translation('pagamento') }}          # Pagamento
{{ Translation('seguranca') }}          # Segurança
{{ Translation('news') }}               # Newsletter
{{ Translation('digitar_nome') }}       # Digitar nome
{{ Translation('digitar_email') }}      # Digitar email
{{ Translation('cadastrar') }}          # Cadastrar
{{ Translation('destaques') }}          # Destaques
{{ Translation('lancamentos') }}        # Lançamentos
{{ Translation('frete_gratis_min') }}   # Frete grátis
{{ Translation('promocoes') }}          # Promoções
{{ Translation('mais_vendidos') }}      # Mais vendidos
{{ Translation('confira_tambem') }}     # Confira também
{{ Translation('produtos_visitados') }} # Produtos visitados
{{ Translation('tags_mais_buscadas') }} # Tags mais buscadas
{{ Translation('limpar_filtros') }}     # Limpar filtros
{{ Translation('filtrar') }}            # Filtrar
{{ Translation('ver_todos') }}          # Ver todos
{{ Translation('categorias') }}         # Categorias
{{ Translation('comparar_produto') }}   # Comparar produto
{{ Translation('remover_comparar') }}   # Remover comparação
{{ Translation('indique_amigo') }}      # Indique amigo
{{ Translation('tire_duvidas') }}       # Tire dúvidas
{{ Translation('a_partir_de') }}        # A partir de
{{ Translation('apartir') }}            # A partir
{{ Translation('compre_junto') }}       # Compre junto
{{ Translation('produtos_relacionados') }} # Produtos relacionados
{{ Translation('nenhum_resultado') }}   # Nenhum resultado
{{ Translation('pagina_inicial') }}     # Página inicial
{{ Translation('ag_atendimento') }}     # Horário de atendimento
{{ Translation('ag_telefone_1') }}      # Telefone 1
{{ Translation('ag_telefone_2') }}      # Telefone 2
{{ Translation('ag_email_1') }}         # Email 1
{{ Translation('ag_email_2') }}         # Email 2
{{ Translation('ag_mensagem_rodape') }} # Mensagem rodapé
```

**Contexto:** Todas as páginas, textos dinâmicos
**Arquivos:** elements/header.html, elements/footer.html, pages/*

---

## 🛍️ 2. VARIÁVEIS DE PRODUTO

### 2.1 Product (Produto)
```markdown
{{ product.id }}                    # ID do produto (number)
{{ product.name }}                  # Nome do produto (string)
{{ product.price }}                 # Preço (number)
{{ product.price_offer }}           # Preço promocional (number)
{{ product.minimum_price }}         # Preço mínimo (number)
{{ product.stock }}                 # Estoque (number)
{{ product.available }}             # Disponível (boolean)
{{ product.link }}                  # Link do produto (string)
{{ product.description }}           # Descrição (string)
{{ product.description_small }}     # Descrição pequena (string)
{{ product.brand }}                 # Marca (string)
{{ product.model }}                 # Modelo (string)
{{ product.ean }}                   # EAN (string)
{{ product.images }}                # Imagens (array)
{{ product.video }}                 # Vídeo (string)
{{ product.has_variation }}         # Tem variação (boolean)
{{ product.has_other_prices }}      # Tem outros preços (boolean)
{{ product.is_kit }}                # É kit (boolean)
{{ product.upon_request }}          # Sob consulta (boolean)
{{ product.show_price }}            # Mostrar preço (boolean)
{{ product.additional_information }} # Informações adicionais (string)
{{ product.additional_message }}    # Mensagem adicional (string)
{{ product.included_items }}        # Itens inclusos (string)
{{ product.related_products }}      # Produtos relacionados (array)
{{ product.ProgressiveDiscounts }}  # Descontos progressivos (array)
{{ product.end_promotion }}         # Fim da promoção (date)
{{ product.promotion_id }}          # ID da promoção (number)
{{ product.ranking.count }}         # Contagem de avaliações (number)
{{ product.ranking.rating }}        # Avaliação (number)
{{ product.comments }}              # Comentários (array)
{{ product.data_tray_ga4 }}         # Dados GA4 (string)
```

**Contexto:** Páginas de produto, listas, vitrines
**Arquivos:** pages/product.html, elements/snippets/product.html, elements/snippets/price.html

### 2.2 Variant (Variação)
```markdown
{{ variant.name }}     # Nome da variação (string)
{{ variant.price }}    # Preço da variação (number)
```

**Contexto:** Produto com variações
**Arquivos:** (quando aplicável)

### 2.3 Brand (Marca)
```markdown
{{ brand.name }}       # Nome da marca (string)
{{ brand.id }}         # ID da marca (number)
```

**Contexto:** Produto, filtro, vitrine
**Arquivos:** (quando aplicável)

### 2.4 Category (Categoria)
```markdown
{{ category.name }}              # Nome da categoria (string)
{{ category.id }}                # ID da categoria (number)
{{ category.small_description }} # Descrição pequena (string)
{{ category.brands }}            # Marcas da categoria (array)
```

**Contexto:** Catálogo, breadcrumb, filtro
**Arquivos:** pages/catalog.html, pages/search.html, elements/smartfilter.html

---

## 🛒 3. VARIÁVEIS DE CARRINHO/CHECKOUT

### 3.1 Cart (Carrinho)
```markdown
{{ cart.amount }}      # Quantidade de itens (number)
{{ cart.price }}       # Valor total (number)
{{ cart.items }}       # Itens do carrinho (array)
```

**Contexto:** Header, carrinho, checkout
**Arquivos:** elements/header.html, elements/snippets/cart.html

### 3.2 Shipping (Frete)
```markdown
{{ shipping.price }}   # Preço do frete (number)
{{ shipping.method }}  # Método de frete (string)
```

**Contexto:** Checkout
**Arquivos:** (quando aplicável)

### 3.3 Payment (Pagamento)
```markdown
{{ payment.method }}           # Método de pagamento (string)
{{ paymentMethods.order }}     # Pagamentos à vista (array)
{{ paymentMethods.credit }}    # Pagamentos a prazo (array)
```

**Contexto:** Checkout, footer
**Arquivos:** elements/snippets/payment-list.html

---

## 👤 4. VARIÁVEIS DE USUÁRIO

### 4.1 Customer (Cliente)
```markdown
{{ customer.name }}    # Nome do cliente (string)
{{ customer.email }}   # Email do cliente (string)
{{ customer.id }}      # ID do cliente (number)
```

**Contexto:** Header, conta, pedidos
**Arquivos:** elements/header.html

### 4.2 Wishlist (Lista de Desejos)
```markdown
{{ wishlist.items }}   # Itens da lista (array)
{{ wishlist.count }}   # Quantidade de itens (number)
```

**Contexto:** Lista de desejos
**Arquivos:** (quando aplicável)

### 4.3 Orders (Pedidos)
```markdown
{{ orders.list }}      # Lista de pedidos (array)
{{ orders.count }}     # Quantidade de pedidos (number)
```

**Contexto:** Pedidos do cliente
**Arquivos:** (quando aplicável)

---

## 🔄 5. LOOPS E ARRAYS

### 5.1 Products (Produtos)
```markdown
{% for product in products %}
  {{ product.name }}
{% endfor %}
```

**Contexto:** Listagens, vitrines
**Arquivos:** pages/home.html, pages/catalog.html, pages/search.html

### 5.2 Categories (Categorias)
```markdown
{% for level1 in categories %}
  {{ level1.name }}
  {% for level2 in level1.children %}
    {{ level2.name }}
  {% endfor %}
{% endfor %}
```

**Contexto:** Menus, navegação
**Arquivos:** elements/snippets/menu.html

### 5.3 Banners (Banners)
```markdown
{{ banner.title }}     # Banner do título (string)
{{ banner.bottom }}    # Banner inferior (string)
{{ banner.extra1 }}    # Banner extra 1 (string)
{{ banner.extra8 }}    # Banner extra 8 (string)
{{ banner.popup }}     # Banner popup (string)
{{ banner.floating }}  # Banner flutuante (string)
```

**Contexto:** Todas as páginas
**Arquivos:** pages/home.html, pages/product.html, pages/catalog.html

### 5.4 Filters (Filtros)
```markdown
{% for myFilter in filters %}
  {{ myFilter.title }}
  {% for item in myFilter.items %}
    {{ item.title }}
  {% endfor %}
{% endfor %}
```

**Contexto:** Catálogo, busca
**Arquivos:** elements/smartfilter.html

### 5.5 Breadcrumb (Navegação)
```markdown
{% for item in breadcrumb %}
  {{ item.name }}
  {{ item.link }}
{% endfor %}
```

**Contexto:** Navegação
**Arquivos:** elements/snippets/breadcrumb.html

### 5.6 Progressive Discounts (Descontos Progressivos)
```markdown
{% for discount in ProgressiveDiscounts %}
  {{ discount.name }}
  {{ discount.banner }}
  {{ discount.tag }}
  {{ discount.description }}
{% endfor %}
```

**Contexto:** Produto
**Arquivos:** pages/product.html, elements/snippets/product.html

### 5.7 Product Tabs (Abas do Produto)
```markdown
{% for key, tab in productTabs %}
  {{ tab.description }}
  {{ tab.container_id }}
  {{ tab.url }}
{% endfor %}
```

**Contexto:** Página de produto
**Arquivos:** pages/product.html

### 5.8 Tags (Tags)
```markdown
{% for tag in tags %}
  {{ tag.word }}
  {{ tag.url }}
  {{ tag.font_size }}
{% endfor %}
```

**Contexto:** Página inicial
**Arquivos:** layouts/default.html

---

## 🛠️ 6. HELPERS E FUNÇÕES

### 6.1 Asset Helper
```markdown
{{ asset('css/theme.min.css') }}
{{ asset('js/theme.min.js') }}
{{ asset('img/logo.svg') }}
{{ asset('css/custom.css', {dynamic: true}) }}
```

### 6.2 Image Helper
```markdown
{{ Image('logo') }}
```

### 6.3 HTML Helpers
```markdown
{{ html.charset() }}
{{ html.script({
    '0': tray.paths.js ~ 'dist/application.min.js?' ~ utils.assets_version,
    '1': tray.paths.js ~ 'init.js?' ~ utils.assets_version
}) }}
```

### 6.4 Tray Helpers
```markdown
{{ tray.meta }}
{{ tray.styles }}
{{ tray.scripts }}
{{ tray.analytics }}
{{ tray.paths.js }}
{{ tray.paths.system_image }}
```

### 6.5 Google Tag Manager
```markdown
{{ googleTagManager.header(pages.current, tagManagerData) }}
{{ googleTagManager.top(pages.current, tagManagerData) }}
{{ googleTagManager.bottom(pages.current, tagManagerData) }}
```

### 6.6 Products Function
```markdown
{% set products = Products({
    'filter': showAvailable,
    'limit': limitProducts,
    'order': {'quantity_sold': 'desc'}
}) %}
```

### 6.7 Utils
```markdown
{{ utils.is_https }}
{{ utils.is_mobile }}
{{ utils.assets_version }}
```

---

## 🔧 7. FILTROS

### 7.1 Currency (Moeda)
```markdown
{{ product.price|currency }}
{{ cart.price|currency }}
```

### 7.2 Number Format
```markdown
{{ product.price|number_format }}
{{ porcentagemDesconto|number_format }}
{{ product.price|number_format(2, '.', '') }}
```

### 7.3 Date
```markdown
{{ "now"|date("d/m/Y") }}
{{ product.end_promotion|date("d/m/Y") }}
```

### 7.4 Replace
```markdown
{{ settings.whatsapp|replace({'(': '', ')': '', '-': '', ' ': ''}) }}
```

### 7.5 Length
```markdown
{{ product.images|length }}
{{ products|length }}
```

---

## ⚡ 8. CONDICIONAIS E LOOPS ESPECIAIS

### 8.1 Condicionais Complexas
```markdown
{% if "central" in pages.current %}
  {% element 'sidebar-central' %}
{% else %}
  {% element 'sidebar-left' %}
{% endif %}

{% if pages.current in ['catalog', 'search'] %}
  {% if settings.history_position == 1 %}
    <!-- conteúdo -->
  {% endif %}
{% endif %}

{% if settings.showcase == "featured" %}
  {% set showcaseText = Translation('destaques') %}
{% elseif settings.showcase == "new" %}
  {% set showcaseText = Translation('lancamentos') %}
{% endif %}
```

### 8.2 Loops Aninhados
```markdown
{% for level1 in categories %}
  <a href="{{ level1.link }}">{{ level1.name }}</a>
  {% if level1.children %}
    {% for level2 in level1.children %}
      <a href="{{ level2.link }}">{{ level2.name }}</a>
      {% if level2.children %}
        {% for level3 in level2.children %}
          <a href="{{ level3.link }}">{{ level3.name }}</a>
        {% endfor %}
      {% endif %}
    {% endfor %}
  {% endif %}
{% endfor %}
```

### 8.3 Element com Parâmetros
```markdown
{% element 'snippets/history' {
    'store.id': store.id,
    'pages.current': pages.current,
    'category.id': category.id
} %}

{% element 'showcase' {
    "products": products,
    "showcaseTitle": showcaseText
} %}
```

### 8.4 Set Variables
```markdown
{% set checkout = "checkout" in pages.current ? "true" : "false" %}
{% set limitProducts = settings.limitProducts ?: 12 %}
{% set showAvailable = settings.show_available_products ? 'available' %}
{% set priceStyle = 'strike' %}
{% set priceOld = 'De: ' %}
```

---

## ⚠️ 9. AVISOS E OBSERVAÇÕES

### 9.1 Variáveis Deprecated
- Algumas variáveis podem não funcionar em versões mais recentes do Tray
- Verificar compatibilidade antes de usar em novos projetos

### 9.2 Contexto de Disponibilidade
- `product.*` - Disponível apenas em páginas de produto e listagens
- `category.*` - Disponível apenas em catálogo e busca
- `cart.*` - Disponível globalmente, mas pode estar vazio
- `customer.*` - Disponível apenas quando usuário logado

### 9.3 Variáveis Inconsistentes
- `banner.*` - Pode variar entre páginas
- `settings.*` - Algumas configurações podem não estar habilitadas
- `Translation()` - Algumas chaves podem não existir

### 9.4 Performance
- Evitar loops muito aninhados
- Usar cache quando possível (`settings.cache_infopreco`)
- Otimizar consultas de produtos

---

## 📁 10. ARQUIVOS ANALISADOS

### Layouts
- `layouts/default.html` - Layout principal
- `layouts/error.html` - Layout de erro
- `layouts/ajax.html` - Layout AJAX

### Elements
- `elements/header.html` - Cabeçalho
- `elements/footer.html` - Rodapé
- `elements/showcase.html` - Vitrine
- `elements/showcase-catalog.html` - Vitrine do catálogo
- `elements/smartfilter.html` - Filtro inteligente
- `elements/new-smart-filter.html` - Novo filtro inteligente
- `elements/sidebar-central.html` - Sidebar central
- `elements/sidebar-left.html` - Sidebar esquerda

### Pages
- `pages/home.html` - Página inicial
- `pages/product.html` - Página de produto
- `pages/catalog.html` - Página de catálogo
- `pages/search.html` - Página de busca

### Snippets
- `elements/snippets/product.html` - Snippet de produto
- `elements/snippets/price.html` - Snippet de preço
- `elements/snippets/cart.html` - Snippet de carrinho
- `elements/snippets/menu.html` - Snippet de menu
- `elements/snippets/breadcrumb.html` - Snippet de navegação
- `elements/snippets/newsletter.html` - Snippet de newsletter
- `elements/snippets/social-list.html` - Snippet de redes sociais
- `elements/snippets/payment-list.html` - Snippet de formas de pagamento
- `elements/snippets/schema-product.html` - Schema do produto
- `elements/snippets/menu-mobile.html` - Menu mobile
- `elements/snippets/search.html` - Busca
- `elements/snippets/customer.html` - Cliente
- `elements/snippets/paginate.html` - Paginação
- `elements/snippets/messages.html` - Mensagens
- `elements/snippets/banner-home.html` - Banner da home
- `elements/snippets/help_links.html` - Links de ajuda
- `elements/snippets/contact_links.html` - Links de contato
- `elements/snippets/menu-central.html` - Menu central
- `elements/snippets/address.html` - Endereço
- `elements/snippets/product-payment.html` - Pagamento do produto
- `elements/snippets/products-visited.html` - Produtos visitados
- `elements/snippets/pricing.html` - Precificação
- `elements/snippets/categories_list.html` - Lista de categorias
- `elements/snippets/buy-form.html` - Formulário de compra

---

## 📊 11. ESTATÍSTICAS DE USO

### Variáveis Mais Utilizadas
1. `{{ settings.* }}` - 45+ ocorrências
2. `{{ Translation() }}` - 40+ ocorrências
3. `{{ product.* }}` - 35+ ocorrências
4. `{{ links.* }}` - 25+ ocorrências
5. `{{ store.* }}` - 15+ ocorrências

### Contextos Mais Comuns
1. **Global** - 60% das variáveis
2. **Produto** - 25% das variáveis
3. **Carrinho** - 10% das variáveis
4. **Usuário** - 5% das variáveis

---

## 🔄 12. EXEMPLOS DE REFATORAÇÃO SEGURA

### Antes
```html
{% if product.price > 0 %}
  <span>{{ product.price }}</span>
{% endif %}
```

### Depois
```html
{% if product.show_price and product.price > 0 %}
  <span>{{ product.price|currency }}</span>
{% endif %}
```

### Antes
```html
<a href="{{ links.cart }}">{{ cart.amount }} itens</a>
```

### Depois
```html
<a href="{{ links.cart }}">
  <span data-cart="amount">{{ cart.amount }}</span> {{ Translation('itens') }}
</a>
```

---

## 📝 13. CONCLUSÃO

Este catálogo documenta **150+ variáveis Tray** encontradas em **42 arquivos HTML** analisados. A documentação inclui:

- ✅ **Tabela de referência rápida** para consulta imediata
- ✅ **Categorização completa** por contexto de uso
- ✅ **Exemplos práticos** de implementação
- ✅ **Avisos de compatibilidade** e boas práticas
- ✅ **Estrutura para refatoração segura**

**Última atualização:** Dezembro 2024
**Versão do Tray analisada:** 11.0.11
**Total de arquivos:** 42 HTML + 1 JSON de configuração 