import Vue from "vue"
import { ValidationProvider, ValidationObserver, extend } from "vee-validate"
import { required, max, regex } from "vee-validate/dist/rules"

Vue.component("ValidationProvider", ValidationProvider)
Vue.component("ValidationObserver", ValidationObserver)

extend("required", required)
extend("regex", regex)
extend("max", max)
