import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilExternalLink,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilPlus,
  cilList,
  cilPizza,
  cilBuilding,
  cilUser,
  cilShieldAlt,
  cilLockUnlocked,
  cilAddressBook,
  cilTags,
  cilFastfood,
  cilLeaf,
  cilTruck,
  cilCalendar,
  cilCart,
  cilApple,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Theme',
  },
  {
    component: CNavItem,
    name: 'Colors',
    to: '/theme/colors',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Typography',
    to: '/theme/typography',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Components',
  },
  {
    component: CNavGroup,
    name: 'Pedidos',
    to: '/pedido',
    icon: <CIcon icon={cilPizza} customClassName="nav-icon" />, // use o ícone que preferir
    items: [
      {
        component: CNavItem,
        name: 'Pedido por garçom',
        to: '/pedido/pedidoGarcom',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      }
      
    ],
  },
  {
    component: CNavGroup,
    name: 'Mesas',
    to: '/mesas',
    icon: <CIcon icon={cilPizza} customClassName="nav-icon" />, // use o ícone que preferir
    items: [
      {
        component: CNavItem,
        name: 'Listar',
        to: '/mesas',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Adicionar',
        to: '/mesas/new',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Cozinhas',
    to: '/cozinha',
    icon: <CIcon icon={cilApple} customClassName="nav-icon" />, // use o ícone que preferir
    items: [
      {
        component: CNavItem,
        name: 'Tabela de Pedidos',
        to: '/cozinha',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Pedidos',
    to: '/Pedido',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Painel de Pedidos',
        to: '/Pedido/new',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Restaurantes',
    to: '/restaurantes',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Listar',
        to: '/restaurantes',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Adicionar',
        to: '/restaurantes/new',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Unidades',
    to: '/unidades',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Listar',
        to: '/unidades',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Adicionar',
        to: '/unidades/new',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Usuários',
    to: '/usuarios',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Listar',
        to: '/usuarios',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Adicionar',
        to: '/usuarios/new',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Perfis',
    to: '/perfis',
    icon: <CIcon icon={cilShieldAlt} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Listar',
        to: '/perfis',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Adicionar',
        to: '/perfis/new',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Permissões',
    to: '/permissoes',
    icon: <CIcon icon={cilLockUnlocked} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Listar',
        to: '/permissoes',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Adicionar',
        to: '/permissoes/new',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Clientes',
    to: '/clientes',
    icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Listar',
        to: '/clientes',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Adicionar',
        to: '/clientes/new',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Cardápios',
    to: '/cardapios',
    icon: <CIcon icon={cilPizza} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Listar',
        to: '/cardapios',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Adicionar',
        to: '/cardapios/new',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Categorias',
    to: '/categorias',
    icon: <CIcon icon={cilTags} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Listar',
        to: '/categorias',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Adicionar',
        to: '/categorias/new',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Itens do Cardápio',
    to: '/itens-cardapio',
    icon: <CIcon icon={cilFastfood} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Listar',
        to: '/itens-cardapio',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Adicionar',
        to: '/itens-cardapio/new',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Ingredientes',
    to: '/ingredientes',
    icon: <CIcon icon={cilLeaf} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Listar',
        to: '/ingredientes',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Adicionar',
        to: '/ingredientes/new',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Fornecedores',
    to: '/fornecedores',
    icon: <CIcon icon={cilTruck} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Listar',
        to: '/fornecedores',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Adicionar',
        to: '/fornecedores/new',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Reservas',
    to: '/reservas',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Listar',
        to: '/reservas',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Adicionar',
        to: '/reservas/new',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Compras',
    to: '/compras',
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Listar',
        to: '/compras',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Adicionar',
        to: '/compras/new',
        icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Base',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Accordion',
        to: '/base/accordion',
      },
      {
        component: CNavItem,
        name: 'Breadcrumb',
        to: '/base/breadcrumbs',
      },
      {
        component: CNavItem,
        name: (
          <React.Fragment>
            {'Calendar'}
            <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
          </React.Fragment>
        ),
        href: 'https://coreui.io/react/docs/components/calendar/',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
      {
        component: CNavItem,
        name: 'Cards',
        to: '/base/cards',
      },
      {
        component: CNavItem,
        name: 'Carousel',
        to: '/base/carousels',
      },
      {
        component: CNavItem,
        name: 'Collapse',
        to: '/base/collapses',
      },
      {
        component: CNavItem,
        name: 'List group',
        to: '/base/list-groups',
      },
      {
        component: CNavItem,
        name: 'Navs & Tabs',
        to: '/base/navs',
      },
      {
        component: CNavItem,
        name: 'Pagination',
        to: '/base/paginations',
      },
      {
        component: CNavItem,
        name: 'Placeholders',
        to: '/base/placeholders',
      },
      {
        component: CNavItem,
        name: 'Popovers',
        to: '/base/popovers',
      },
      {
        component: CNavItem,
        name: 'Progress',
        to: '/base/progress',
      },
      {
        component: CNavItem,
        name: 'Smart Pagination',
        href: 'https://coreui.io/react/docs/components/smart-pagination/',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
      {
        component: CNavItem,
        name: (
          <React.Fragment>
            {'Smart Table'}
            <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
          </React.Fragment>
        ),
        href: 'https://coreui.io/react/docs/components/smart-table/',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
      {
        component: CNavItem,
        name: 'Spinners',
        to: '/base/spinners',
      },
      {
        component: CNavItem,
        name: 'Tables',
        to: '/base/tables',
      },
      {
        component: CNavItem,
        name: 'Tabs',
        to: '/base/tabs',
      },
      {
        component: CNavItem,
        name: 'Tooltips',
        to: '/base/tooltips',
      },
      {
        component: CNavItem,
        name: (
          <React.Fragment>
            {'Virtual Scroller'}
            <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
          </React.Fragment>
        ),
        href: 'https://coreui.io/react/docs/components/virtual-scroller/',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Buttons',
    to: '/buttons',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Buttons',
        to: '/buttons/buttons',
      },
      {
        component: CNavItem,
        name: 'Buttons groups',
        to: '/buttons/button-groups',
      },
      {
        component: CNavItem,
        name: 'Dropdowns',
        to: '/buttons/dropdowns',
      },
      {
        component: CNavItem,
        name: (
          <React.Fragment>
            {'Loading Button'}
            <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
          </React.Fragment>
        ),
        href: 'https://coreui.io/react/docs/components/loading-button/',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Forms',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: (
          <React.Fragment>
            {'Autocomplete'}
            <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
          </React.Fragment>
        ),
        href: 'https://coreui.io/react/docs/forms/autocomplete/',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
      {
        component: CNavItem,
        name: 'Checks & Radios',
        to: '/forms/checks-radios',
      },
      {
        component: CNavItem,
        name: (
          <React.Fragment>
            {'Date Picker'}
            <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
          </React.Fragment>
        ),
        href: 'https://coreui.io/react/docs/forms/date-picker/',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
      {
        component: CNavItem,
        name: 'Date Range Picker',
        href: 'https://coreui.io/react/docs/forms/date-range-picker/',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
      {
        component: CNavItem,
        name: 'Floating Labels',
        to: '/forms/floating-labels',
      },
      {
        component: CNavItem,
        name: 'Form Control',
        to: '/forms/form-control',
      },
      {
        component: CNavItem,
        name: 'Input Group',
        to: '/forms/input-group',
      },
      {
        component: CNavItem,
        name: (
          <React.Fragment>
            {'Multi Select'}
            <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
          </React.Fragment>
        ),
        href: 'https://coreui.io/react/docs/forms/multi-select/',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
      {
        component: CNavItem,
        name: (
          <React.Fragment>
            {'Password Input'}
            <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
          </React.Fragment>
        ),
        href: 'https://coreui.io/react/docs/forms/password-input/',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
      {
        component: CNavItem,
        name: 'Range',
        to: '/forms/range',
      },
      {
        component: CNavItem,
        name: (
          <React.Fragment>
            {'Range Slider'}
            <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
          </React.Fragment>
        ),
        href: 'https://coreui.io/react/docs/forms/range-slider/',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
      {
        component: CNavItem,
        name: (
          <React.Fragment>
            {'Rating'}
            <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
          </React.Fragment>
        ),
        href: 'https://coreui.io/react/docs/forms/rating/',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
      {
        component: CNavItem,
        name: 'Select',
        to: '/forms/select',
      },
      {
        component: CNavItem,
        name: (
          <React.Fragment>
            {'Stepper'}
            <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
          </React.Fragment>
        ),
        href: 'https://coreui.io/react/docs/forms/stepp/',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
      {
        component: CNavItem,
        name: (
          <React.Fragment>
            {'Time Picker'}
            <CIcon icon={cilExternalLink} size="sm" className="ms-2" />
          </React.Fragment>
        ),
        href: 'https://coreui.io/react/docs/forms/time-picker/',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
      {
        component: CNavItem,
        name: 'Layout',
        to: '/forms/layout',
      },
      {
        component: CNavItem,
        name: 'Validation',
        to: '/forms/validation',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Charts',
    to: '/charts',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Icons',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'CoreUI Free',
        to: '/icons/coreui-icons',
      },
      {
        component: CNavItem,
        name: 'CoreUI Flags',
        to: '/icons/flags',
      },
      {
        component: CNavItem,
        name: 'CoreUI Brands',
        to: '/icons/brands',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Notifications',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Alerts',
        to: '/notifications/alerts',
      },
      {
        component: CNavItem,
        name: 'Badges',
        to: '/notifications/badges',
      },
      {
        component: CNavItem,
        name: 'Modal',
        to: '/notifications/modals',
      },
      {
        component: CNavItem,
        name: 'Toasts',
        to: '/notifications/toasts',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Widgets',
    to: '/widgets',
    icon: <CIcon icon={cilCalculator} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Pages',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Docs',
    href: 'https://coreui.io/react/docs/templates/installation/',
    icon: <CIcon icon={cilDescription} customClassName="nav-icon" />,
  },
]

export default _nav
