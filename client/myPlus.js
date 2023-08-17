import MenuItem from './components/menu-item.vue'
import Navbar from './components/nav-bar.vue'
import NavbarPlus from './components/nav-bar-plus.vue'
import TwNavBar from "./components/tw-nav-bar.vue";
import Card from './components/card/index.vue'
import CardTapable from "./components/card/card-tapable.vue";
import Tag from "./components/tag/index.vue";

export default function() {
	return {
		install(app, params) {
			app.component('menu-item', MenuItem)
			app.component('nav-bar', Navbar)
			app.component('nav-bar-plus', NavbarPlus)
			app.component('tw-nav-bar', TwNavBar)
			app.component('card', Card)
			app.component('card-tapable', CardTapable)
			app.component('tag', Tag)
		}
	}
}