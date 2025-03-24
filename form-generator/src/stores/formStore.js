import { defineStore } from "pinia";

export const useFormStore = defineStore({
    state: () => ({
        form: {
            elements: [],
            buttonOk: null,
            buttonCancel: null,
            elemetsCount: 0
        }
    }),

    actions: {
        addInput(label, value, isDisabled, isShow) {
            this.form.elements.push(new FormInput(label, value, isDisabled, isShow))
        },

        addSelect(label, value, isDisabled, isShow) {
            this.form.elements.push(new FormSelect(label, value, isDisabled, isShow))
        },

        setButtonOk({ text, color, action, isDisabled, isShow }) {
            this.form.buttonOk = new FormButton(
                text || 'Ok',
                color = color || 'blue',
                action = () => action || this.formSubmit(),
                isDisabled = isDisabled || false,
                isShow = isShow || true)
        },

        setButtonCancel({ text, color, action, isDisabled, isShow }) {
            this.form.buttonCancel = new FormButton(
                text || 'Cancel',
                color = color || 'red',
                action = () => action || this.formCancel(),
                isDisabled = isDisabled || false,
                isShow = isShow || true)
        },


        getElementIndex(elenent) {
            return this.form.elements.findIndex(e => e.index === elenent.index)
        },
        getElementByIndex(index) {
            return this.form.elements[index]
        },


        async formSubmit() {
            console.log('formSubmit')
        },

        formCancel() {
            console.log('formCancel')
        }
    }
})

class FormElement {
    constructor(label, type, value, isDisabled, isShow) {
        this.index = Form.elemetsCount++
        this.label = label
        this.type = type
        this.value = value
        this.isDisabled = isDisabled
        this.isShow = isShow
    }
}

export const FormElementType = Object.freeze({
    INPUT: 'input',
    SELECT: 'select',
    CHECKBOX: 'checkbox',
    TEXTAREA: 'textarea',
    BUTTON: 'button',
    IMAGE: 'image'
})

class FormInput extends FormElement {
    constructor(label, value, isDisabled, isShow) {
        super(label, type = FormElementType.INPUT, value, isDisabled, isShow)
    }
}

class FormButton {
    constructor(text, color, action, isDisabled, isShow) {
        this.text = text
        this.color = color
        this.action = action
        this.isDisabled = isDisabled
        this.isShow = isShow
    }
}