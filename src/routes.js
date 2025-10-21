import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

// --- Mesas (já existentes no seu código de exemplo) ---
const MesaList = React.lazy(() => import('./views/mesas/MesaList'))
const MesaAdd = React.lazy(() => import('./views/mesas/MesaAdd'))

// --- Restaurantes ---
const RestauranteList = React.lazy(() => import('./views/restaurantes/RestauranteList'))
const RestauranteAdd = React.lazy(() => import('./views/restaurantes/RestauranteAdd'))

// --- Unidades ---
const UnidadeList = React.lazy(() => import('./views/unidades/UnidadeList'))
const UnidadeAdd = React.lazy(() => import('./views/unidades/UnidadeAdd'))

// --- Usuários ---
const UsuarioList = React.lazy(() => import('./views/usuarios/UsuarioList'))
const UsuarioAdd = React.lazy(() => import('./views/usuarios/UsuarioAdd'))
const UsuarioEdit = React.lazy(() => import('./views/usuarios/UsuarioEdit'))

// --- Perfis ---
const PerfilList = React.lazy(() => import('./views/perfis/PerfilList'))
const PerfilAdd = React.lazy(() => import('./views/perfis/PerfilAdd'))

// --- Permissões ---
const PermissaoList = React.lazy(() => import('./views/permissoes/PermissaoList'))
const PermissaoAdd = React.lazy(() => import('./views/permissoes/PermissaoAdd'))

// --- Clientes ---
const ClienteList = React.lazy(() => import('./views/clientes/ClienteList'))
const ClienteAdd = React.lazy(() => import('./views/clientes/ClienteAdd'))

// --- Cardápios ---
const CardapioList = React.lazy(() => import('./views/cardapios/CardapioList'))
const CardapioAdd = React.lazy(() => import('./views/cardapios/CardapioAdd'))

// --- Categorias ---
const CategoriaList = React.lazy(() => import('./views/categorias/CategoriaList'))
const CategoriaAdd = React.lazy(() => import('./views/categorias/CategoriaAdd'))

// --- Itens do Cardápio ---
const ItemCardapioList = React.lazy(() => import('./views/itens-cardapio/ItemCardapioList'))
const ItemCardapioAdd = React.lazy(() => import('./views/itens-cardapio/ItemCardapioAdd'))

// --- Ingredientes ---
const IngredienteList = React.lazy(() => import('./views/ingredientes/IngredienteList'))
const IngredienteAdd = React.lazy(() => import('./views/ingredientes/IngredienteAdd'))

// --- Fornecedores ---
const FornecedorList = React.lazy(() => import('./views/fornecedores/FornecedorList'))
const FornecedorAdd = React.lazy(() => import('./views/fornecedores/FornecedorAdd'))

// --- Reservas ---
const ReservaList = React.lazy(() => import('./views/reservas/ReservaList'))
const ReservaAdd = React.lazy(() => import('./views/reservas/ReservaAdd'))

// --- Compras ---
const CompraList = React.lazy(() => import('./views/compras/CompraList'))
const CompraAdd = React.lazy(() => import('./views/compras/CompraAdd'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  // Mesas
  { path: '/mesas', name: 'Mesas', element: MesaList, exact: true },
  { path: '/mesas/new', name: 'Adicionar Mesa', element: MesaAdd },

  // Restaurantes
  { path: '/restaurantes', name: 'Restaurantes', element: RestauranteList, exact: true },
  { path: '/restaurantes/new', name: 'Adicionar Restaurante', element: RestauranteAdd },

  // Unidades
  { path: '/unidades', name: 'Unidades', element: UnidadeList, exact: true },
  { path: '/unidades/new', name: 'Adicionar Unidade', element: UnidadeAdd },

  // Usuários
  { path: '/usuarios', name: 'Usuários', element: UsuarioList, exact: true },
  { path: '/usuarios/new', name: 'Adicionar Usuário', element: UsuarioAdd },
  { path: '/usuarios/editar/:id', name: 'Editar Usuário', element: UsuarioEdit },
  // Perfis
  { path: '/perfis', name: 'Perfis', element: PerfilList, exact: true },
  { path: '/perfis/new', name: 'Adicionar Perfil', element: PerfilAdd },

  // Permissões
  { path: '/permissoes', name: 'Permissões', element: PermissaoList, exact: true },
  { path: '/permissoes/new', name: 'Adicionar Permissão', element: PermissaoAdd },

  // Clientes
  { path: '/clientes', name: 'Clientes', element: ClienteList, exact: true },
  { path: '/clientes/new', name: 'Adicionar Cliente', element: ClienteAdd },

  // Cardápios
  { path: '/cardapios', name: 'Cardápios', element: CardapioList, exact: true },
  { path: '/cardapios/new', name: 'Adicionar Cardápio', element: CardapioAdd },

  // Categorias
  { path: '/categorias', name: 'Categorias', element: CategoriaList, exact: true },
  { path: '/categorias/new', name: 'Adicionar Categoria', element: CategoriaAdd },

  // Itens do Cardápio
  { path: '/itens-cardapio', name: 'Itens do Cardápio', element: ItemCardapioList, exact: true },
  { path: '/itens-cardapio/new', name: 'Adicionar Item do Cardápio', element: ItemCardapioAdd },

  // Ingredientes
  { path: '/ingredientes', name: 'Ingredientes', element: IngredienteList, exact: true },
  { path: '/ingredientes/new', name: 'Adicionar Ingrediente', element: IngredienteAdd },

  // Fornecedores
  { path: '/fornecedores', name: 'Fornecedores', element: FornecedorList, exact: true },
  { path: '/fornecedores/new', name: 'Adicionar Fornecedor', element: FornecedorAdd },

  // Reservas
  { path: '/reservas', name: 'Reservas', element: ReservaList, exact: true },
  { path: '/reservas/new', name: 'Adicionar Reserva', element: ReservaAdd },

  // Compras
  { path: '/compras', name: 'Compras', element: CompraList, exact: true },
  { path: '/compras/new', name: 'Adicionar Compra', element: CompraAdd },

  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/theme/typography', name: 'Typography', element: Typography },
  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tabs', name: 'Tabs', element: Tabs },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
