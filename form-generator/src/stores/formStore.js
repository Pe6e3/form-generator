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
            const form = {
                title: title,
                elements: this.elements.map(element => ({
                    id: element.id,
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
                    action: this.buttonOk.action
                } : null,
                buttonCancel: this.buttonCancel ? {
                    text: this.buttonCancel.text,
                    color: this.buttonCancel.color,
                    textColor: this.buttonCancel.textColor,
                    isDisabled: this.buttonCancel.isDisabled,
                    isShow: this.buttonCancel.isShow,
                    action: this.buttonCancel.action
                } : null,
            };

            this.resetForm(); // очищаем стор после генерации формы
            return form;
        },

        createFormElement({ label, type, value, placeholder, isDisabled, isShow }) {
            return {
                id: label.toLowerCase().replace(/\s+/g, '-'),
                index: this.elemetsCount++,
                label,
                type,
                value,
                placeholder,
                isDisabled,
                isShow
            };
        },

        addInput({ label, value = null, isDisabled = false, placeholder = null, isShow = true }) {
            if (!label) {
                console.error('FormStore.addInput: необходимо ввести название поля')
                return
            }
            const input = {
                ...this.createFormElement({ label, type: FormElementType.INPUT, value, placeholder, isDisabled, isShow })
            };
            this.elements.push(input);
            return input.value
        },

        addSelect({ label, values = [], selectedValue = values[0], isDisabled = false, isShow = true }) {
            if (!label) {
                console.error('FormStore.addSelect: необходимо ввести название поля')
                return
            }
            if (values.length === 0) {
                console.error('FormStore.addSelect: необходимо ввести массив значений для выбора')
                return
            }

            const select = {
                ...this.createFormElement({
                    label,
                    type: FormElementType.SELECT,
                    value: selectedValue || values[0],
                    placeholder: null,
                    isDisabled,
                    isShow
                }),
                values: values.map(value => ({
                    name: value,
                    isSelected: value === selectedValue
                }))
            };
            this.elements.push(select);
        },

        addCheckbox({ label, values = [], selectedValues = [], isDisabled = false, isShow = true }) {
            if (!label) {
                console.error('FormStore.addCheckbox: необходимо ввести название поля')
                return
            }
            if (values.length === 0) {
                console.error('FormStore.addCheckbox: необходимо ввести массив значений для выбора')
                return
            }

            const checkbox = {
                ...this.createFormElement({
                    label,
                    type: FormElementType.CHECKBOX,
                    value: selectedValues,
                    placeholder: null,
                    isDisabled,
                    isShow
                }),
                values: values.map(value => ({
                    name: value,
                    isSelected: selectedValues.includes(value)
                }))
            };
            this.elements.push(checkbox);
        },

        addTextarea({ label, value = null, isDisabled = false, placeholder = null, isShow = true, rows = 3 }) {
            if (!label) {
                console.error('FormStore.addTextarea: необходимо ввести название поля')
                return
            }

            const textarea = {
                ...this.createFormElement({
                    label,
                    type: FormElementType.TEXTAREA,
                    value,
                    placeholder,
                    isDisabled,
                    isShow
                }),
                rows
            };
            this.elements.push(textarea);
        },

        setButtonOk({ text, color, textColor, action, isDisabled, isShow }) {
            this.buttonOk = {
                text: text || 'Ok',
                color: color || 'blue',
                textColor: textColor || 'white',
                action: action || this.formSubmit,
                isDisabled: isDisabled || false,
                isShow: isShow || true
            };
        },

        setButtonCancel({ text, color, textColor, action, isDisabled, isShow }) {
            this.buttonCancel = {
                text: text || 'Cancel',
                color: color || 'red',
                textColor: textColor || 'white',
                action: action || this.formCancel,
                isDisabled: isDisabled || false,
                isShow: isShow || true
            };
        },

        getElementIndex(element) {
            return this.elements.findIndex(e => e.index === element.index)
        },

        getElementByIndex(index) {
            return this.elements[index]
        },

        updateElementValue(index, value) {
            const element = this.elements.find(e => e.index === index);
            if (element) {
                element.value = value;
                if (element.type === FormElementType.SELECT) {
                    element.values = element.values.map(v => ({
                        ...v,
                        isSelected: v.name === value
                    }));
                } else if (element.type === FormElementType.CHECKBOX) {
                    element.values = element.values.map(v => ({
                        ...v,
                        isSelected: value.includes(v.name)
                    }));
                }
            }
        },

        collectFormData(form) {
            const formData = {};
            form.elements.forEach(element => {
                switch (element.type) {
                    case 'input':
                        formData[element.label] = element.value;
                        break;
                    case 'select':
                        formData[element.label] = element.value;
                        break;
                    case 'checkbox':
                        formData[element.label] = element.value;
                        break;
                    case 'textarea':
                        formData[element.label] = element.value;
                        break;
                }
            });
            return formData;
        },

        async formSubmit() {
            console.log('formSubmit')
        },

        formCancel() {
            console.log('formCancel')
        },

        resetForm() {
            this.elements = [];
            this.buttonOk = null;
            this.buttonCancel = null;
            this.elemetsCount = 0;
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