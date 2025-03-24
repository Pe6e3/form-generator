import { defineStore } from "pinia";

export const useFormStore = defineStore('formStore', {
    state: () => ({
        elements: [],
        buttonOk: null,
        buttonCancel: null,
        elemetsCount: 0
    }),

    actions: {

        generateForm(title) {
            return {
                title: title,
                elements: this.elements.map(element => ({
                    index: element.index,
                    label: element.label,
                    type: element.type,
                    value: element.value,
                    placeholder: element.placeholder,
                    values: element.values || null,
                    isDisabled: element.isDisabled,
                    isShow: element.isShow,
                })),
                buttonOk: this.buttonOk ? {
                    text: this.buttonOk.text,
                    color: this.buttonOk.color,
                    textColor: this.buttonOk.textColor,
                    isDisabled: this.buttonOk.isDisabled,
                    isShow: this.buttonOk.isShow,
                } : null,
                buttonCancel: this.buttonCancel ? {
                    text: this.buttonCancel.text,
                    color: this.buttonCancel.color,
                    textColor: this.buttonCancel.textColor,
                    isDisabled: this.buttonCancel.isDisabled,
                    isShow: this.buttonCancel.isShow,
                } : null,
            };
        },
        

        /**
         * @param {String} label - название поля (*обязательно)
         * @param {String} value - значение поля
         * @param {Boolean} isDisabled - заблокировано ли поле
         * @param {Boolean} isShow - отображается ли поле
         */
        addInput({
            label,
            value = null,
            isDisabled = false,
            placeholder = null,
            isShow = true }) {
            if (!label) {
                console.error('FormStore.addInput: необходимо ввести название поля')
                return
            }
            const input = new FormInput(label, value, placeholder, isDisabled, isShow)
            this.elements.push(input)
        },

        /**
         * @param {String} label - название поля (*обязательно)
         * @param {Array} values - массив значений для выбора (*обязательно)
         * @param {String} selectedValue - выбранное значение (по умолчанию первое)
         * @param {Boolean} isDisabled - заблокировано ли поле
         * @param {Boolean} isShow - отображается ли поле
         */
        addSelect({
            label,
            values = [],
            selectedValue = values[0],
            isDisabled = false,
            isShow = true }) {
            if (!label) {
                console.error('FormStore.addSelect: необходимо ввести название поля')
                return
            }
            if (values.length === 0) {
                console.error('FormStore.addSelect: необходимо ввести массив значений для выбора')
                return
            }

            this.elements.push(new FormSelect(label, values, selectedValue, isDisabled, isShow))
        },

        addCheckbox({
            label,
            values = [],
            selectedValues = [],
            isDisabled = false,
            isShow = true }) {
            if (!label) {
                console.error('FormStore.addCheckbox: необходимо ввести название поля')
                return
            }
            if (values.length === 0) {
                console.error('FormStore.addCheckbox: необходимо ввести массив значений для выбора')
                return
            }

            this.elements.push(new FormCheckbox(label, values, selectedValues, isDisabled, isShow))
        },


        /**
         * @param {String} text - текст кнопки (по умолчанию 'Ok')
         * @param {String} color - цвет кнопки (по умолчанию 'blue')
         * @param {Function} action - действие при нажатии (по умолчанию formSubmit)
         * @param {Boolean} isDisabled - заблокирована ли кнопка (по умолчанию false)
         * @param {Boolean} isShow - отображается ли кнопка (по умолчанию true)
         */
        setButtonOk({ text, color, textColor, action, isDisabled, isShow }) {
            this.buttonOk = new FormButton(
                text || 'Ok',
                color = color || 'blue',
                textColor = textColor || 'white',
                action = () => action || this.formSubmit(),
                isDisabled = isDisabled || false,
                isShow = isShow || true)
        },

        /**
         * @param {String} text - текст кнопки (по умолчанию 'Cancel') 
         * @param {String} color - цвет кнопки (по умолчанию 'red')
         * @param {Function} action - действие при нажатии (по умолчанию formCancel)
         * @param {Boolean} isDisabled - заблокирована ли кнопка (по умолчанию false)
         * @param {Boolean} isShow - отображается ли кнопка (по умолчанию true)
         */
        setButtonCancel({ text, color, textColor, action, isDisabled, isShow }) {
            this.buttonCancel = new FormButton(
                text || 'Cancel',
                color = color || 'red',
                textColor = textColor || 'white',
                action = () => action || this.formCancel(),
                isDisabled = isDisabled || false,
                isShow = isShow || true)
            console.log(this.buttonCancel)
        },


        getElementIndex(elenent) {
            return this.elements.findIndex(e => e.index === elenent.index)
        },
        getElementByIndex(index) {
            return this.elements[index]
        },


        async formSubmit() {
            console.log('formSubmit')
        },

        formCancel() {
            console.log('formCancel')
        }
    }
})

export const FormElementType = Object.freeze({
    INPUT: 'input',
    SELECT: 'select',
    CHECKBOX: 'checkbox',
    TEXTAREA: 'textarea',
    BUTTON: 'button',
    IMAGE: 'image'
})

class FormElement {
    constructor(label, type, value, placeholder, isDisabled, isShow) {
        const formStore = useFormStore()
        this.index = formStore.elemetsCount++
        this.label = label
        this.placeholder = placeholder
        this.type = type
        this.value = value
        this.isDisabled = isDisabled
        this.isShow = isShow
    }
}

class FormInput extends FormElement {
    constructor(label, value, placeholder, isDisabled, isShow) {
        super(label, FormElementType.INPUT, value, placeholder, isDisabled, isShow)
    }
}

class FormSelect extends FormElement {
    constructor(label, values, selectedValue, isDisabled, isShow) {
        super(label, FormElementType.SELECT, selectedValue, isDisabled, isShow)
        if (!Array.isArray(values)) {
            console.error('FormSelect: values должен быть массивом')
            return
        }
        if (selectedValue && !values.includes(selectedValue))
            console.error('FormSelect: selectedValue должен быть одним из значений values')
        this.value = selectedValue || values[0]
        this.values = values.map(value => ({
            name: value,
            isSelected: value === selectedValue
        }));
    }
}

/**
* @param {String} label - название поля
* @param {Array} checkboxValues - массив значений для выбора
* @param {Array} selectedValues - массив выбранных значений
*/
class FormCheckbox extends FormElement {
    constructor(label, checkboxValues, selectedValues, isDisabled, isShow) {
        super(label, FormElementType.CHECKBOX, selectedValues, isDisabled, isShow)
        if (!Array.isArray(checkboxValues)) {
            console.error('FormCheckbox: checkboxValues должен быть массивом')
            return
        }
        if (!Array.isArray(selectedValues) && selectedValues) {
            console.error('FormCheckbox: selectedValues должен быть массивом')
            return
        }
        this.values = checkboxValues.map(value => ({
            name: value,
            isSelected: selectedValues.includes(value)
        }));

    }
}

/**
* @param {String} text - текст кнопки
* @param {String} color - цвет фона кнопки
* @param {String} textColor - цвет текста кнопки
* @param {Function} action - функция, которая будет вызвана при нажатии на кнопку
* @param {Boolean} isDisabled - заблокирована ли кнопка
* @param {Boolean} isShow - отображается ли кнопка
*/
class FormButton {
    constructor(text, color, textColor, action, isDisabled, isShow) {
        this.text = text
        this.color = color
        this.textColor = textColor
        this.action = action
        this.isDisabled = isDisabled
        this.isShow = isShow
    }
}