import { Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2, } from '@angular/core';
import { ControlContainer, NgControl } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
export class Ng2FlatpickrDirective {
    /** Allow double-clicking on the control to open/close it. */
    onClick() {
        if (this.flatpickr) {
            this.flatpickr.toggle();
        }
    }
    constructor(parent, ngControl, element, renderer) {
        this.parent = parent;
        this.ngControl = ngControl;
        this.element = element;
        this.renderer = renderer;
        /**
         * onChange gets triggered when the user selects a date, or changes the time on a selected date.
         *
         * Default:  null
         */
        this.flatpickrOnChange = new EventEmitter();
        /**
         * onClose gets triggered when the calendar is closed.
         *
         * Default:  null
         */
        this.flatpickrOnClose = new EventEmitter();
        /**
         * onOpen gets triggered when the calendar is opened.
         *
         * Default:  null
         */
        this.flatpickrOnOpen = new EventEmitter();
        /**
         * onReady gets triggered once the calendar is in a ready state.
         *
         * Default:  null
         */
        this.flatpickrOnReady = new EventEmitter();
    }
    get control() {
        if (!this.parent.formDirective) {
            throw new Error('Ng2FlatpickrDirective must be used within a form group');
        }
        const control = this.parent ? this.parent.formDirective.getControl(this.ngControl) : null;
        if (!control) {
            throw new Error('Control cannot be found in the form group');
        }
        return control;
    }
    ngAfterViewInit() {
        /** We cannot initialize the flatpickr instance in ngOnInit(); it will
         randomize the date when the form control initializes. */
        let nativeElement = this.element.nativeElement;
        if (typeof nativeElement === 'undefined' || nativeElement === null) {
            throw 'Error: invalid input element specified';
        }
        if (this.flatpickrOptions && this.flatpickrOptions.wrap) {
            this.renderer.setAttribute(this.element.nativeElement, 'data-input', '');
            nativeElement = nativeElement.parentNode;
        }
        this.flatpickr = nativeElement.flatpickr(this.flatpickrOptions);
    }
    ngOnChanges(changes) {
        if (this.flatpickr &&
            this.flatpickrAltInput &&
            this.flatpickr.altInput &&
            changes.hasOwnProperty('placeholder') &&
            changes['placeholder'].currentValue) {
            this.flatpickr.altInput.setAttribute('placeholder', changes['placeholder'].currentValue);
        }
    }
    ngOnDestroy() {
        if (this.flatpickr) {
            this.flatpickr.destroy();
        }
        if (this.formControlListener) {
            this.formControlListener.unsubscribe();
            this.formControlListener = undefined;
        }
        this.flatpickrOnChange = new EventEmitter();
        this.flatpickrOnClose = new EventEmitter();
        this.flatpickrOnOpen = new EventEmitter();
        this.flatpickrOnReady = new EventEmitter();
    }
    ngOnInit() {
        this.globalOnChange = this.flatpickrOptions ? this.flatpickrOptions.onChange : undefined;
        this.globalOnClose = this.flatpickrOptions ? this.flatpickrOptions.onClose : undefined;
        this.globalOnOpen = this.flatpickrOptions ? this.flatpickrOptions.onOpen : undefined;
        this.globalOnReady = this.flatpickrOptions ? this.flatpickrOptions.onReady : undefined;
        this.flatpickrOptions = {
            altFormat: this.getOption('altFormat'),
            altInput: this.getOption('altInput'),
            altInputClass: this.getOption('altInputClass'),
            allowInput: this.getOption('allowInput'),
            appendTo: this.getOption('appendTo'),
            clickOpens: this.getOption('clickOpens', true),
            dateFormat: this.getOption('dateFormat'),
            defaultDate: this.getOption('defaultDate'),
            disable: this.getOption('disable'),
            disableMobile: this.getOption('disableMobile'),
            enable: this.getOption('enable'),
            enableTime: this.getOption('enableTime'),
            enableSeconds: this.getOption('enableSeconds'),
            hourIncrement: this.getOption('hourIncrement'),
            inline: this.getOption('inline'),
            locale: this.getOption('locale'),
            maxDate: this.getOption('maxDate'),
            minDate: this.getOption('minDate'),
            minuteIncrement: this.getOption('minuteIncrement'),
            mode: this.getOption('mode'),
            nextArrow: this.getOption('nextArrow'),
            noCalendar: this.getOption('noCalendar'),
            onChange: this.eventOnChange.bind(this),
            onClose: this.eventOnClose.bind(this),
            onOpen: this.eventOnOpen.bind(this),
            onReady: this.eventOnReady.bind(this),
            parseDate: this.getOption('parseDate'),
            prevArrow: this.getOption('prevArrow'),
            shorthandCurrentMonth: this.getOption('shorthandCurrentMonth'),
            static: this.getOption('static'),
            time_24hr: this.getOption('time_24hr'),
            utc: this.getOption('utc'),
            weekNumbers: this.getOption('weekNumbers'),
            wrap: this.getOption('wrap', true),
        };
        // Remove unset properties
        Object.keys(this.flatpickrOptions).forEach((key) => {
            if (this.flatpickrOptions && this.flatpickrOptions[key] === undefined) {
                delete this.flatpickrOptions[key];
            }
        });
        if (this.control) {
            this.formControlListener = this.control.valueChanges.subscribe((value) => {
                if (!(value instanceof Date)) {
                    // Quietly update the value of the form control to be a
                    // Date object. This avoids any external subscribers
                    // from being notified a second time (once for the user
                    // initiated event, and once for our conversion to
                    // Date()).
                    this.control.setValue(new Date('' + value), {
                        onlySelf: true,
                        emitEvent: false,
                        emitModelToViewChange: false,
                        emitViewToModelChange: false,
                    });
                }
            });
        }
    }
    /**
     * Fire off the event emitter for the directive element, and also for the
     * global onChange callback, if defined.
     */
    eventOnChange(selectedDates, dateStr, instance) {
        let event = {
            selectedDates: selectedDates,
            dateStr: dateStr,
            instance: instance,
        };
        if (this.flatpickrOnChange) {
            this.flatpickrOnChange.emit(event);
        }
        if (this.globalOnChange) {
            this.globalOnChange(event);
        }
    }
    /**
     * Fire off the event emitter for the directive element, and also for the
     * global onClose callback, if defined.
     */
    eventOnClose(selectedDates, dateStr, instance) {
        let event = {
            selectedDates: selectedDates,
            dateStr: dateStr,
            instance: instance,
        };
        if (this.flatpickrOnClose) {
            this.flatpickrOnClose.emit(event);
        }
        if (this.globalOnClose) {
            this.globalOnClose(event);
        }
    }
    /**
     * Fire off the event emitter for the directive element, and also for the
     * global onOpen callback, if defined.
     */
    eventOnOpen(selectedDates, dateStr, instance) {
        let event = {
            selectedDates: selectedDates,
            dateStr: dateStr,
            instance: instance,
        };
        if (this.flatpickrOnOpen) {
            this.flatpickrOnOpen.emit(event);
        }
        if (this.globalOnOpen) {
            this.globalOnOpen(event);
        }
    }
    /**
     * Fire off the event emitter for the directive element, and also for the
     * global onReady callback, if defined.
     */
    eventOnReady(selectedDates, dateStr, instance) {
        let event = {
            selectedDates: selectedDates,
            dateStr: dateStr,
            instance: instance,
        };
        if (this.flatpickrOnReady) {
            this.flatpickrOnReady.emit(event);
        }
        if (this.globalOnReady) {
            this.globalOnReady(event);
        }
    }
    /**
     * Return the configuration value for option {option}, or {defaultValue} if it
     * doesn't exist.
     */
    getOption(option, defaultValue) {
        let localName = 'flatpickr' + option.substring(0, 1).toUpperCase() + option.substring(1);
        if (typeof this[localName] !== 'undefined') {
            return this[localName];
        }
        else if (this.flatpickrOptions && typeof this.flatpickrOptions[option] !== 'undefined') {
            return this.flatpickrOptions[option];
        }
        else {
            return defaultValue;
        }
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.8", ngImport: i0, type: Ng2FlatpickrDirective, deps: [{ token: i1.ControlContainer }, { token: i1.NgControl }, { token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.0.8", type: Ng2FlatpickrDirective, selector: "[flatpickr]", inputs: { flatpickrOptions: ["flatpickr", "flatpickrOptions"], placeholder: "placeholder", flatpickrAltFormat: ["altFormat", "flatpickrAltFormat"], flatpickrAltInput: ["altInput", "flatpickrAltInput"], flatpickrAltInputClass: ["altInputClass", "flatpickrAltInputClass"], flatpickrAllowInput: ["allowInput", "flatpickrAllowInput"], flatpickrAppendTo: ["appendTo", "flatpickrAppendTo"], flatpickrClickOpens: ["clickOpens", "flatpickrClickOpens"], flatpickrDateFormat: ["dateFormat", "flatpickrDateFormat"], flatpickrDefaultDate: ["defaultDate", "flatpickrDefaultDate"], flatpickrDisable: ["disable", "flatpickrDisable"], flatpickrDisableMobile: ["disableMobile", "flatpickrDisableMobile"], flatpickrEnable: ["enable", "flatpickrEnable"], flatpickrEnableTime: ["enableTime", "flatpickrEnableTime"], flatpickrEnableSeconds: ["enableSeconds", "flatpickrEnableSeconds"], flatpickrHourIncrement: ["hourIncrement", "flatpickrHourIncrement"], flatpickrInline: ["inline", "flatpickrInline"], flatpickrLocale: ["locale", "flatpickrLocale"], flatpickrMaxDate: ["maxDate", "flatpickrMaxDate"], flatpickrMinDate: ["minDate", "flatpickrMinDate"], flatpickrMinuteIncrement: ["minuteIncrement", "flatpickrMinuteIncrement"], flatpickrMode: ["mode", "flatpickrMode"], flatpickrNextArrow: ["nextArrow", "flatpickrNextArrow"], flatpickrNoCalendar: ["noCalendar", "flatpickrNoCalendar"], flatpickrParseDate: ["parseDate", "flatpickrParseDate"], flatpickrPrevArrow: ["prevArrow", "flatpickrPrevArrow"], flatpickrShorthandCurrentMonth: ["shorthandCurrentMonth", "flatpickrShorthandCurrentMonth"], flatpickrStatic: ["static", "flatpickrStatic"], flatpickrTime_24hr: ["time_24hr", "flatpickrTime_24hr"], flatpickrUtc: ["utc", "flatpickrUtc"], flatpickrWeekNumbers: ["weekNumbers", "flatpickrWeekNumbers"], flatpickrWrap: ["wrap", "flatpickrWrap"] }, outputs: { flatpickrOnChange: "onChange", flatpickrOnClose: "onClose", flatpickrOnOpen: "onOpen", flatpickrOnReady: "onReady" }, host: { listeners: { "dblclick": "onClick()" } }, exportAs: ["ng2-flatpickr"], usesOnChanges: true, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.8", ngImport: i0, type: Ng2FlatpickrDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[flatpickr]',
                    exportAs: 'ng2-flatpickr',
                }]
        }], ctorParameters: () => [{ type: i1.ControlContainer }, { type: i1.NgControl }, { type: i0.ElementRef }, { type: i0.Renderer2 }], propDecorators: { flatpickrOptions: [{
                type: Input,
                args: ['flatpickr']
            }], placeholder: [{
                type: Input,
                args: ['placeholder']
            }], flatpickrAltFormat: [{
                type: Input,
                args: ['altFormat']
            }], flatpickrAltInput: [{
                type: Input,
                args: ['altInput']
            }], flatpickrAltInputClass: [{
                type: Input,
                args: ['altInputClass']
            }], flatpickrAllowInput: [{
                type: Input,
                args: ['allowInput']
            }], flatpickrAppendTo: [{
                type: Input,
                args: ['appendTo']
            }], flatpickrClickOpens: [{
                type: Input,
                args: ['clickOpens']
            }], flatpickrDateFormat: [{
                type: Input,
                args: ['dateFormat']
            }], flatpickrDefaultDate: [{
                type: Input,
                args: ['defaultDate']
            }], flatpickrDisable: [{
                type: Input,
                args: ['disable']
            }], flatpickrDisableMobile: [{
                type: Input,
                args: ['disableMobile']
            }], flatpickrEnable: [{
                type: Input,
                args: ['enable']
            }], flatpickrEnableTime: [{
                type: Input,
                args: ['enableTime']
            }], flatpickrEnableSeconds: [{
                type: Input,
                args: ['enableSeconds']
            }], flatpickrHourIncrement: [{
                type: Input,
                args: ['hourIncrement']
            }], flatpickrInline: [{
                type: Input,
                args: ['inline']
            }], flatpickrLocale: [{
                type: Input,
                args: ['locale']
            }], flatpickrMaxDate: [{
                type: Input,
                args: ['maxDate']
            }], flatpickrMinDate: [{
                type: Input,
                args: ['minDate']
            }], flatpickrMinuteIncrement: [{
                type: Input,
                args: ['minuteIncrement']
            }], flatpickrMode: [{
                type: Input,
                args: ['mode']
            }], flatpickrNextArrow: [{
                type: Input,
                args: ['nextArrow']
            }], flatpickrNoCalendar: [{
                type: Input,
                args: ['noCalendar']
            }], flatpickrParseDate: [{
                type: Input,
                args: ['parseDate']
            }], flatpickrPrevArrow: [{
                type: Input,
                args: ['prevArrow']
            }], flatpickrShorthandCurrentMonth: [{
                type: Input,
                args: ['shorthandCurrentMonth']
            }], flatpickrStatic: [{
                type: Input,
                args: ['static']
            }], flatpickrTime_24hr: [{
                type: Input,
                args: ['time_24hr']
            }], flatpickrUtc: [{
                type: Input,
                args: ['utc']
            }], flatpickrWeekNumbers: [{
                type: Input,
                args: ['weekNumbers']
            }], flatpickrWrap: [{
                type: Input,
                args: ['wrap']
            }], flatpickrOnChange: [{
                type: Output,
                args: ['onChange']
            }], flatpickrOnClose: [{
                type: Output,
                args: ['onClose']
            }], flatpickrOnOpen: [{
                type: Output,
                args: ['onOpen']
            }], flatpickrOnReady: [{
                type: Output,
                args: ['onReady']
            }], onClick: [{
                type: HostListener,
                args: ['dblclick']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWZsYXRwaWNrci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZzItZmxhdHBpY2tyL3NyYy9saWIvbmcyLWZsYXRwaWNrci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFlBQVksRUFDWixLQUFLLEVBSUwsTUFBTSxFQUNOLFNBQVMsR0FFVixNQUFNLGVBQWUsQ0FBQztBQUt2QixPQUFPLEVBQUUsZ0JBQWdCLEVBQWUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQU0xRSxNQUFNLE9BQU8scUJBQXFCO0lBMFFoQyw2REFBNkQ7SUFFdEQsT0FBTztRQUNaLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztJQWFELFlBQ1ksTUFBd0IsRUFDeEIsU0FBb0IsRUFDcEIsT0FBbUIsRUFDbkIsUUFBbUI7UUFIbkIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLGFBQVEsR0FBUixRQUFRLENBQVc7UUFuRC9COzs7O1dBSUc7UUFDd0Isc0JBQWlCLEdBQWlDLElBQUksWUFBWSxFQUFFLENBQUM7UUFFaEc7Ozs7V0FJRztRQUN1QixxQkFBZ0IsR0FBaUMsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU5Rjs7OztXQUlHO1FBQ3NCLG9CQUFlLEdBQWlDLElBQUksWUFBWSxFQUFFLENBQUM7UUFFNUY7Ozs7V0FJRztRQUN1QixxQkFBZ0IsR0FBaUMsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQTBCM0YsQ0FBQztJQUVKLElBQUksT0FBTztRQUNULElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEs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QUFvQjtzQkFBaEQsS0FBSzt1QkFBQyxhQUFhO2dCQU9FLGFBQWE7c0JBQWxDLEtBQUs7dUJBQUMsTUFBTTtnQkFPYyxpQkFBaUI7c0JBQTNDLE1BQU07dUJBQUMsVUFBVTtnQkFPUSxnQkFBZ0I7c0JBQXpDLE1BQU07dUJBQUMsU0FBUztnQkFPUSxlQUFlO3NCQUF2QyxNQUFNO3VCQUFDLFFBQVE7Z0JBT1UsZ0JBQWdCO3NCQUF6QyxNQUFNO3VCQUFDLFNBQVM7Z0JBSVYsT0FBTztzQkFEYixZQUFZO3VCQUFDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIEFmdGVyVmlld0luaXQsXHJcbiAgRGlyZWN0aXZlLFxyXG4gIEVsZW1lbnRSZWYsXHJcbiAgRXZlbnRFbWl0dGVyLFxyXG4gIEhvc3RMaXN0ZW5lcixcclxuICBJbnB1dCxcclxuICBPbkNoYW5nZXMsXHJcbiAgT25EZXN0cm95LFxyXG4gIE9uSW5pdCxcclxuICBPdXRwdXQsXHJcbiAgUmVuZGVyZXIyLFxyXG4gIFNpbXBsZUNoYW5nZXMsXHJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IEZsYXRwaWNrck9wdGlvbnMgfSBmcm9tICcuL2ZsYXRwaWNrci1vcHRpb25zLmludGVyZmFjZSc7XHJcbmltcG9ydCB7IEZsYXRwaWNrckV2ZW50IH0gZnJvbSAnLi9mbGF0cGlja3ItZXZlbnQuaW50ZXJmYWNlJztcclxuaW1wb3J0IHsgRmxhdHBpY2tySW5zdGFuY2UgfSBmcm9tICcuL2ZsYXRwaWNrci1pbnN0YW5jZSc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xyXG5pbXBvcnQgeyBDb250cm9sQ29udGFpbmVyLCBGb3JtQ29udHJvbCwgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5cclxuQERpcmVjdGl2ZSh7XHJcbiAgc2VsZWN0b3I6ICdbZmxhdHBpY2tyXScsXHJcbiAgZXhwb3J0QXM6ICduZzItZmxhdHBpY2tyJyxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5nMkZsYXRwaWNrckRpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgT25Jbml0LCBPbkNoYW5nZXMge1xyXG4gIC8qKlxyXG4gICAqIFRoZSBmbGF0cGlja3IgY29uZmlndXJhdGlvbiBhcyBhIHNpbmdsZSBvYmplY3Qgb2YgdmFsdWVzLlxyXG4gICAqXHJcbiAgICogU2VlIGh0dHBzOi8vY2htbG4uZ2l0aHViLmlvL2ZsYXRwaWNrci9vcHRpb25zLyBmb3IgZnVsbCBsaXN0LlxyXG4gICAqL1xyXG4gIEBJbnB1dCgnZmxhdHBpY2tyJykgcHVibGljIGZsYXRwaWNrck9wdGlvbnM6IEZsYXRwaWNrck9wdGlvbnMgfCB1bmRlZmluZWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIFBsYWNlaG9sZGVyIGZvciBpbnB1dCBmaWVsZC5cclxuICAgKlxyXG4gICAqIERlZmF1bHQ6ICBudWxsXHJcbiAgICovXHJcbiAgQElucHV0KCdwbGFjZWhvbGRlcicpIHB1YmxpYyBwbGFjZWhvbGRlcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xyXG5cclxuICAvKipcclxuICAgKiBFeGFjdGx5IHRoZSBzYW1lIGFzIGRhdGUgZm9ybWF0LCBidXQgZm9yIHRoZSBhbHRJbnB1dCBmaWVsZC5cclxuICAgKlxyXG4gICAqIERlZmF1bHQ6ICBcIkYgaiwgWVwiXHJcbiAgICovXHJcbiAgQElucHV0KCdhbHRGb3JtYXQnKSBwdWJsaWMgZmxhdHBpY2tyQWx0Rm9ybWF0OiBzdHJpbmcgfCB1bmRlZmluZWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNob3cgdGhlIHVzZXIgYSByZWFkYWJsZSBkYXRlIChhcyBwZXIgYWx0Rm9ybWF0KSwgYnV0IHJldHVybiBzb21ldGhpbmdcclxuICAgKiB0b3RhbGx5IGRpZmZlcmVudCB0byB0aGUgc2VydmVyLlxyXG4gICAqXHJcbiAgICogRGVmYXVsdDogIGZhbHNlXHJcbiAgICovXHJcbiAgQElucHV0KCdhbHRJbnB1dCcpIHB1YmxpYyBmbGF0cGlja3JBbHRJbnB1dDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhpcyBjbGFzcyB3aWxsIGJlIGFkZGVkIHRvIHRoZSBpbnB1dCBlbGVtZW50IGNyZWF0ZWQgYnkgdGhlIGFsdElucHV0XHJcbiAgICogb3B0aW9uLlxyXG4gICAqXHJcbiAgICogRGVmYXVsdDogIFwiXCJcclxuICAgKi9cclxuICBASW5wdXQoJ2FsdElucHV0Q2xhc3MnKSBwdWJsaWMgZmxhdHBpY2tyQWx0SW5wdXRDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xyXG5cclxuICAvKipcclxuICAgKiBBbGxvd3MgdGhlIHVzZXIgdG8gZW50ZXIgYSBkYXRlIGRpcmVjdGx5IGlucHV0IHRoZSBpbnB1dCBmaWVsZC4gQnlcclxuICAgKiBkZWZhdWx0LCBkaXJlY3QgZW50cnkgaXMgZGlzYWJsZWQuXHJcbiAgICpcclxuICAgKiBEZWZhdWx0OiAgZmFsc2VcclxuICAgKi9cclxuICBASW5wdXQoJ2FsbG93SW5wdXQnKSBwdWJsaWMgZmxhdHBpY2tyQWxsb3dJbnB1dDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcclxuXHJcbiAgLyoqXHJcbiAgICogSW5zdGVhZCBvZiBib2R5LCBhcHBlbmRzIHRoZSBjYWxlbmRhciB0byB0aGUgc3BlY2lmaWVkIG5vZGUgaW5zdGVhZC5cclxuICAgKlxyXG4gICAqIERlZmF1bHQ6ICBudWxsXHJcbiAgICovXHJcbiAgQElucHV0KCdhcHBlbmRUbycpIHB1YmxpYyBmbGF0cGlja3JBcHBlbmRUbzogYW55OyAvLyBIVE1MRWxlbWVudFxyXG5cclxuICAvKipcclxuICAgKiBXaGV0aGVyIGNsaWNraW5nIG9uIHRoZSBpbnB1dCBzaG91bGQgb3BlbiB0aGUgcGlja2VyLlxyXG4gICAqIFlvdSBjb3VsZCBkaXNhYmxlIHRoaXMgaWYgeW91IHdpc2ggdG8gb3BlbiB0aGUgY2FsZW5kYXIgbWFudWFsbHlcclxuICAgKiB3aXRoLm9wZW4oKS5cclxuICAgKlxyXG4gICAqIERlZmF1bHQ6ICB0cnVlXHJcbiAgICovXHJcbiAgQElucHV0KCdjbGlja09wZW5zJykgcHVibGljIGZsYXRwaWNrckNsaWNrT3BlbnM6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgc3RyaW5nIG9mIGNoYXJhY3RlcnMgd2hpY2ggYXJlIHVzZWQgdG8gZGVmaW5lIGhvdyB0aGUgZGF0ZSB3aWxsIGJlXHJcbiAgICogZGlzcGxheWVkIGluIHRoZSBpbnB1dCBib3guXHJcbiAgICogU2VlIGh0dHBzOi8vY2htbG4uZ2l0aHViLmlvL2ZsYXRwaWNrci9mb3JtYXR0aW5nLyBmb3Igc3VwcG9ydGVkIHRva2Vucy5cclxuICAgKlxyXG4gICAqIERlZmF1bHQ6ICBcIlktbS1kXCJcclxuICAgKi9cclxuICBASW5wdXQoJ2RhdGVGb3JtYXQnKSBwdWJsaWMgZmxhdHBpY2tyRGF0ZUZvcm1hdDogc3RyaW5nIHwgdW5kZWZpbmVkO1xyXG5cclxuICAvKipcclxuICAgKiBTZXRzIHRoZSBpbml0aWFsIHNlbGVjdGVkIGRhdGUocykuXHJcbiAgICpcclxuICAgKiBJZiB5b3UncmUgdXNpbmcge21vZGU6IFwibXVsdGlwbGVcIn0gb3IgYSByYW5nZSBjYWxlbmRhciBzdXBwbHkgYW4gQXJyYXkgb2ZcclxuICAgKiBEYXRlIG9iamVjdHMgb3IgYW4gQXJyYXkgb2YgZGF0ZSBzdHJpbmdzIHdoaWNoIGZvbGxvdyB5b3VyIGRhdGVGb3JtYXQuXHJcbiAgICpcclxuICAgKiBPdGhlcndpc2UsIHlvdSBjYW4gc3VwcGx5IGEgc2luZ2xlIERhdGUgb2JqZWN0IG9yIGEgZGF0ZSBzdHJpbmcuXHJcbiAgICpcclxuICAgKiBEZWZhdWx0OiAgbnVsbFxyXG4gICAqL1xyXG4gIEBJbnB1dCgnZGVmYXVsdERhdGUnKSBwdWJsaWMgZmxhdHBpY2tyRGVmYXVsdERhdGU6IHN0cmluZyB8IERhdGUgfCBzdHJpbmdbXSB8IERhdGVbXSB8IHVuZGVmaW5lZDtcclxuXHJcbiAgLyoqXHJcbiAgICogRGlzYWJsZSBhbiBhcnJheSBvZiBzcGVjaWZpYyBkYXRlcywgZGF0ZSByYW5nZXMsIG9yIGZ1bmN0aW9ucyB0byBkaXNhYmxlXHJcbiAgICogZGF0ZXMuIFNlZSBodHRwczovL2NobWxuLmdpdGh1Yi5pby9mbGF0cGlja3IvZXhhbXBsZXMvI2Rpc2FibGluZy1zcGVjaWZpYy1kYXRlc1xyXG4gICAqXHJcbiAgICogRGVmYXVsdDogIFtdXHJcbiAgICovXHJcbiAgQElucHV0KCdkaXNhYmxlJykgcHVibGljIGZsYXRwaWNrckRpc2FibGU6IHN0cmluZ1tdIHwgRGF0ZVtdIHwgRnVuY3Rpb24gfCB1bmRlZmluZWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCBkaXNhYmxlTW9iaWxlIHRvIHRydWUgdG8gYWx3YXlzIHVzZSB0aGUgbm9uLW5hdGl2ZSBwaWNrZXIuIEJ5XHJcbiAgICogZGVmYXVsdCwgRmxhdHBpY2tyIHV0aWxpemVzIG5hdGl2ZSBkYXRldGltZSB3aWRnZXRzIHVubGVzcyBjZXJ0YWluXHJcbiAgICogb3B0aW9ucyAoZS5nLiBkaXNhYmxlKSBhcmUgdXNlZC5cclxuICAgKlxyXG4gICAqIERlZmF1bHQ6ICBmYWxzZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgnZGlzYWJsZU1vYmlsZScpIHB1YmxpYyBmbGF0cGlja3JEaXNhYmxlTW9iaWxlOiBib29sZWFuIHwgdW5kZWZpbmVkO1xyXG5cclxuICAvKipcclxuICAgKiBFbmFibGUgYW4gYXJyYXkgb2Ygc3BlY2lmaWMgZGF0ZXMsIGRhdGUgcmFuZ2VzLCBvciBmdW5jdGlvbnMgdG8gZW5hYmxlXHJcbiAgICogZGF0ZXMuIFNlZSBodHRwczovL2NobWxuLmdpdGh1Yi5pby9mbGF0cGlja3IvZXhhbXBsZXMvI2Rpc2FibGluZy1hbGwtZGF0ZXMtZXhjZXB0LXNlbGVjdC1mZXdcclxuICAgKlxyXG4gICAqIERlZmF1bHQ6ICBbXVxyXG4gICAqL1xyXG4gIEBJbnB1dCgnZW5hYmxlJykgcHVibGljIGZsYXRwaWNrckVuYWJsZTogc3RyaW5nW10gfCBEYXRlW10gfCBGdW5jdGlvbiB8IHVuZGVmaW5lZDtcclxuXHJcbiAgLyoqXHJcbiAgICogRW5hYmxlcyB0aW1lIHBpY2tlci5cclxuICAgKlxyXG4gICAqIERlZmF1bHQ6ICBmYWxzZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgnZW5hYmxlVGltZScpIHB1YmxpYyBmbGF0cGlja3JFbmFibGVUaW1lOiBib29sZWFuIHwgdW5kZWZpbmVkO1xyXG5cclxuICAvKipcclxuICAgKiBFbmFibGVzIHNlY29uZHMgaW4gdGhlIHRpbWUgcGlja2VyLlxyXG4gICAqXHJcbiAgICogRGVmYXVsdDogIGZhbHNlXHJcbiAgICovXHJcbiAgQElucHV0KCdlbmFibGVTZWNvbmRzJykgcHVibGljIGZsYXRwaWNrckVuYWJsZVNlY29uZHM6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkanVzdHMgdGhlIHN0ZXAgZm9yIHRoZSBob3VyIGlucHV0IChpbmNsLiBzY3JvbGxpbmcpLlxyXG4gICAqXHJcbiAgICogRGVmYXVsdDogIDFcclxuICAgKi9cclxuICBASW5wdXQoJ2hvdXJJbmNyZW1lbnQnKSBwdWJsaWMgZmxhdHBpY2tySG91ckluY3JlbWVudDogbnVtYmVyIHwgdW5kZWZpbmVkO1xyXG5cclxuICAvKipcclxuICAgKiBEaXNwbGF5cyB0aGUgY2FsZW5kYXIgaW5saW5lLlxyXG4gICAqXHJcbiAgICogRGVmYXVsdDogIGZhbHNlXHJcbiAgICovXHJcbiAgQElucHV0KCdpbmxpbmUnKSBwdWJsaWMgZmxhdHBpY2tySW5saW5lOiBib29sZWFuIHwgdW5kZWZpbmVkO1xyXG5cclxuICAvKipcclxuICAgKiBVc2UgYSBzcGVjaWZpYyBsb2NhbGUgZm9yIHRoZSBmbGF0cGlja3IgaW5zdGFuY2UuXHJcbiAgICpcclxuICAgKiBEZWZhdWx0OiAgbnVsbFxyXG4gICAqL1xyXG4gIEBJbnB1dCgnbG9jYWxlJykgcHVibGljIGZsYXRwaWNrckxvY2FsZTogT2JqZWN0IHwgdW5kZWZpbmVkO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgbWF4aW11bSBkYXRlIHRoYXQgYSB1c2VyIGNhbiBwaWNrIHRvIChpbmNsdXNpdmUpLlxyXG4gICAqXHJcbiAgICogRGVmYXVsdDogIG51bGxcclxuICAgKi9cclxuICBASW5wdXQoJ21heERhdGUnKSBwdWJsaWMgZmxhdHBpY2tyTWF4RGF0ZTogc3RyaW5nIHwgRGF0ZSB8IHVuZGVmaW5lZDtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG1pbmltdW0gZGF0ZSB0aGF0IGEgdXNlciBjYW4gc3RhcnQgcGlja2luZyBmcm9tIChpbmNsdXNpdmUpLlxyXG4gICAqXHJcbiAgICogRGVmYXVsdDogIG51bGxcclxuICAgKi9cclxuICBASW5wdXQoJ21pbkRhdGUnKSBwdWJsaWMgZmxhdHBpY2tyTWluRGF0ZTogc3RyaW5nIHwgRGF0ZSB8IHVuZGVmaW5lZDtcclxuXHJcbiAgLyoqXHJcbiAgICogQWRqdXN0cyB0aGUgc3RlcCBmb3IgdGhlIG1pbnV0ZSBpbnB1dCAoaW5jbC4gc2Nyb2xsaW5nKS5cclxuICAgKlxyXG4gICAqIERlZmF1bHQ6ICA1XHJcbiAgICovXHJcbiAgQElucHV0KCdtaW51dGVJbmNyZW1lbnQnKSBwdWJsaWMgZmxhdHBpY2tyTWludXRlSW5jcmVtZW50OiBudW1iZXIgfCB1bmRlZmluZWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIFwic2luZ2xlXCIsIFwibXVsdGlwbGVcIiwgb3IgXCJyYW5nZVwiXHJcbiAgICpcclxuICAgKiBEZWZhdWx0OiAgXCJzaW5nbGVcIlxyXG4gICAqL1xyXG4gIEBJbnB1dCgnbW9kZScpIHB1YmxpYyBmbGF0cGlja3JNb2RlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIEhUTUwgZm9yIHRoZSBhcnJvdyBpY29uLCB1c2VkIHRvIHN3aXRjaCBtb250aHMuXHJcbiAgICpcclxuICAgKiBEZWZhdWx0OiAgXCI+XCJcclxuICAgKi9cclxuICBASW5wdXQoJ25leHRBcnJvdycpIHB1YmxpYyBmbGF0cGlja3JOZXh0QXJyb3c6IHN0cmluZyB8IHVuZGVmaW5lZDtcclxuXHJcbiAgLyoqXHJcbiAgICogSGlkZXMgdGhlIGRheSBzZWxlY3Rpb24gaW4gY2FsZW5kYXIuIFVzZSBpdCBhbG9uZyB3aXRoIGVuYWJsZVRpbWUgdG9cclxuICAgKiBjcmVhdGUgYSB0aW1lIHBpY2tlci5cclxuICAgKlxyXG4gICAqIERlZmF1bHQ6ICBmYWxzZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgnbm9DYWxlbmRhcicpIHB1YmxpYyBmbGF0cGlja3JOb0NhbGVuZGFyOiBib29sZWFuIHwgdW5kZWZpbmVkO1xyXG5cclxuICAvKipcclxuICAgKiBGdW5jdGlvbiB0aGF0IGV4cGVjdHMgYSBkYXRlIHN0cmluZyBhbmQgbXVzdCByZXR1cm4gYSBEYXRlIG9iamVjdC5cclxuICAgKlxyXG4gICAqIERlZmF1bHQ6ICBmYWxzZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgncGFyc2VEYXRlJykgcHVibGljIGZsYXRwaWNrclBhcnNlRGF0ZTogRnVuY3Rpb24gfCB1bmRlZmluZWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIEhUTUwgZm9yIHRoZSBsZWZ0IGFycm93IGljb24uXHJcbiAgICpcclxuICAgKiBEZWZhdWx0OiAgXCI8XCJcclxuICAgKi9cclxuICBASW5wdXQoJ3ByZXZBcnJvdycpIHB1YmxpYyBmbGF0cGlja3JQcmV2QXJyb3c6IHN0cmluZyB8IHVuZGVmaW5lZDtcclxuXHJcbiAgLyoqXHJcbiAgICogU2hvdyB0aGUgbW9udGggdXNpbmcgdGhlIHNob3J0aGFuZCB2ZXJzaW9uIChpZSwgU2VwIGluc3RlYWQgb2YgU2VwdGVtYmVyKS5cclxuICAgKlxyXG4gICAqIERlZmF1bHQ6ICBmYWxzZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgnc2hvcnRoYW5kQ3VycmVudE1vbnRoJykgcHVibGljIGZsYXRwaWNrclNob3J0aGFuZEN1cnJlbnRNb250aDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcclxuXHJcbiAgLyoqXHJcbiAgICogUG9zaXRpb24gdGhlIGNhbGVuZGFyIGluc2lkZSB0aGUgd3JhcHBlciBhbmQgbmV4dCB0byB0aGUgaW5wdXQgZWxlbWVudFxyXG4gICAqIChMZWF2ZSBmYWxzZSB1bmxlc3MgeW91IGtub3cgd2hhdCB5b3UncmUgZG9pbmcpLlxyXG4gICAqXHJcbiAgICogRGVmYXVsdDogIGZhbHNlXHJcbiAgICovXHJcbiAgQElucHV0KCdzdGF0aWMnKSBwdWJsaWMgZmxhdHBpY2tyU3RhdGljOiBib29sZWFuIHwgdW5kZWZpbmVkO1xyXG5cclxuICAvKipcclxuICAgKiBEaXNwbGF5cyB0aW1lIHBpY2tlciBpbiAyNCBob3VyIG1vZGUgd2l0aG91dCBBTS9QTSBzZWxlY3Rpb24gd2hlbiBlbmFibGVkLlxyXG4gICAqXHJcbiAgICogRGVmYXVsdDogIGZhbHNlXHJcbiAgICovXHJcbiAgQElucHV0KCd0aW1lXzI0aHInKSBwdWJsaWMgZmxhdHBpY2tyVGltZV8yNGhyOiBib29sZWFuIHwgdW5kZWZpbmVkO1xyXG5cclxuICBASW5wdXQoJ3V0YycpIHB1YmxpYyBmbGF0cGlja3JVdGM6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XHJcblxyXG4gIC8qKlxyXG4gICAqIEVuYWJsZXMgZGlzcGxheSBvZiB3ZWVrIG51bWJlcnMgaW4gY2FsZW5kYXIuXHJcbiAgICpcclxuICAgKiBEZWZhdWx0OiAgZmFsc2VcclxuICAgKi9cclxuICBASW5wdXQoJ3dlZWtOdW1iZXJzJykgcHVibGljIGZsYXRwaWNrcldlZWtOdW1iZXJzOiBib29sZWFuIHwgdW5kZWZpbmVkO1xyXG5cclxuICAvKipcclxuICAgKiBDdXN0b20gZWxlbWVudHMgYW5kIGlucHV0IGdyb3Vwcy5cclxuICAgKlxyXG4gICAqIERlZmF1bHQ6ICBmYWxzZVxyXG4gICAqL1xyXG4gIEBJbnB1dCgnd3JhcCcpIHB1YmxpYyBmbGF0cGlja3JXcmFwOiBib29sZWFuIHwgdW5kZWZpbmVkO1xyXG5cclxuICAvKipcclxuICAgKiBvbkNoYW5nZSBnZXRzIHRyaWdnZXJlZCB3aGVuIHRoZSB1c2VyIHNlbGVjdHMgYSBkYXRlLCBvciBjaGFuZ2VzIHRoZSB0aW1lIG9uIGEgc2VsZWN0ZWQgZGF0ZS5cclxuICAgKlxyXG4gICAqIERlZmF1bHQ6ICBudWxsXHJcbiAgICovXHJcbiAgQE91dHB1dCgnb25DaGFuZ2UnKSBwdWJsaWMgZmxhdHBpY2tyT25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxGbGF0cGlja3JFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIG9uQ2xvc2UgZ2V0cyB0cmlnZ2VyZWQgd2hlbiB0aGUgY2FsZW5kYXIgaXMgY2xvc2VkLlxyXG4gICAqXHJcbiAgICogRGVmYXVsdDogIG51bGxcclxuICAgKi9cclxuICBAT3V0cHV0KCdvbkNsb3NlJykgcHVibGljIGZsYXRwaWNrck9uQ2xvc2U6IEV2ZW50RW1pdHRlcjxGbGF0cGlja3JFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIG9uT3BlbiBnZXRzIHRyaWdnZXJlZCB3aGVuIHRoZSBjYWxlbmRhciBpcyBvcGVuZWQuXHJcbiAgICpcclxuICAgKiBEZWZhdWx0OiAgbnVsbFxyXG4gICAqL1xyXG4gIEBPdXRwdXQoJ29uT3BlbicpIHB1YmxpYyBmbGF0cGlja3JPbk9wZW46IEV2ZW50RW1pdHRlcjxGbGF0cGlja3JFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIG9uUmVhZHkgZ2V0cyB0cmlnZ2VyZWQgb25jZSB0aGUgY2FsZW5kYXIgaXMgaW4gYSByZWFkeSBzdGF0ZS5cclxuICAgKlxyXG4gICAqIERlZmF1bHQ6ICBudWxsXHJcbiAgICovXHJcbiAgQE91dHB1dCgnb25SZWFkeScpIHB1YmxpYyBmbGF0cGlja3JPblJlYWR5OiBFdmVudEVtaXR0ZXI8RmxhdHBpY2tyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xyXG5cclxuICAvKiogQWxsb3cgZG91YmxlLWNsaWNraW5nIG9uIHRoZSBjb250cm9sIHRvIG9wZW4vY2xvc2UgaXQuICovXHJcbiAgQEhvc3RMaXN0ZW5lcignZGJsY2xpY2snKVxyXG4gIHB1YmxpYyBvbkNsaWNrKCkge1xyXG4gICAgaWYgKHRoaXMuZmxhdHBpY2tyKSB7XHJcbiAgICAgIHRoaXMuZmxhdHBpY2tyLnRvZ2dsZSgpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcHJvdGVjdGVkIGdsb2JhbE9uQ2hhbmdlOiBGdW5jdGlvbiB8IHVuZGVmaW5lZDtcclxuICBwcm90ZWN0ZWQgZ2xvYmFsT25DbG9zZTogRnVuY3Rpb24gfCB1bmRlZmluZWQ7XHJcbiAgcHJvdGVjdGVkIGdsb2JhbE9uT3BlbjogRnVuY3Rpb24gfCB1bmRlZmluZWQ7XHJcbiAgcHJvdGVjdGVkIGdsb2JhbE9uUmVhZHk6IEZ1bmN0aW9uIHwgdW5kZWZpbmVkO1xyXG5cclxuICBwcm90ZWN0ZWQgZmxhdHBpY2tyOiBGbGF0cGlja3JJbnN0YW5jZSB8IHVuZGVmaW5lZDtcclxuICBwcm90ZWN0ZWQgZm9ybUNvbnRyb2xMaXN0ZW5lcjogU3Vic2NyaXB0aW9uIHwgdW5kZWZpbmVkO1xyXG5cclxuICAvKiogQWxsb3cgYWNjZXNzIHByb3BlcnRpZXMgdXNpbmcgaW5kZXggbm90YXRpb24gKi9cclxuICBba2V5OiBzdHJpbmddOiBhbnk7XHJcblxyXG4gIGNvbnN0cnVjdG9yKFxyXG4gICAgcHJvdGVjdGVkIHBhcmVudDogQ29udHJvbENvbnRhaW5lcixcclxuICAgIHByb3RlY3RlZCBuZ0NvbnRyb2w6IE5nQ29udHJvbCxcclxuICAgIHByb3RlY3RlZCBlbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgcHJvdGVjdGVkIHJlbmRlcmVyOiBSZW5kZXJlcjIsXHJcbiAgKSB7fVxyXG5cclxuICBnZXQgY29udHJvbCgpOiBGb3JtQ29udHJvbCB7XHJcbiAgICBpZiAoIXRoaXMucGFyZW50LmZvcm1EaXJlY3RpdmUpIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZzJGbGF0cGlja3JEaXJlY3RpdmUgbXVzdCBiZSB1c2VkIHdpdGhpbiBhIGZvcm0gZ3JvdXAnKTtcclxuICAgIH1cclxuICAgIGNvbnN0IGNvbnRyb2wgPSB0aGlzLnBhcmVudCA/IHRoaXMucGFyZW50LmZvcm1EaXJlY3RpdmUuZ2V0Q29udHJvbCh0aGlzLm5nQ29udHJvbCkgOiBudWxsO1xyXG4gICAgaWYgKCFjb250cm9sKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ29udHJvbCBjYW5ub3QgYmUgZm91bmQgaW4gdGhlIGZvcm0gZ3JvdXAnKTtcclxuICAgIH1cclxuICAgIHJldHVybiBjb250cm9sO1xyXG4gIH1cclxuXHJcbiAgbmdBZnRlclZpZXdJbml0KCkge1xyXG4gICAgLyoqIFdlIGNhbm5vdCBpbml0aWFsaXplIHRoZSBmbGF0cGlja3IgaW5zdGFuY2UgaW4gbmdPbkluaXQoKTsgaXQgd2lsbFxyXG4gICAgIHJhbmRvbWl6ZSB0aGUgZGF0ZSB3aGVuIHRoZSBmb3JtIGNvbnRyb2wgaW5pdGlhbGl6ZXMuICovXHJcbiAgICBsZXQgbmF0aXZlRWxlbWVudCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xyXG5cclxuICAgIGlmICh0eXBlb2YgbmF0aXZlRWxlbWVudCA9PT0gJ3VuZGVmaW5lZCcgfHwgbmF0aXZlRWxlbWVudCA9PT0gbnVsbCkge1xyXG4gICAgICB0aHJvdyAnRXJyb3I6IGludmFsaWQgaW5wdXQgZWxlbWVudCBzcGVjaWZpZWQnO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmZsYXRwaWNrck9wdGlvbnMgJiYgdGhpcy5mbGF0cGlja3JPcHRpb25zLndyYXApIHtcclxuICAgICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5lbGVtZW50Lm5hdGl2ZUVsZW1lbnQsICdkYXRhLWlucHV0JywgJycpO1xyXG4gICAgICBuYXRpdmVFbGVtZW50ID0gbmF0aXZlRWxlbWVudC5wYXJlbnROb2RlO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZmxhdHBpY2tyID0gPEZsYXRwaWNrckluc3RhbmNlPm5hdGl2ZUVsZW1lbnQuZmxhdHBpY2tyKHRoaXMuZmxhdHBpY2tyT3B0aW9ucyk7XHJcbiAgfVxyXG5cclxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMuZmxhdHBpY2tyICYmXHJcbiAgICAgIHRoaXMuZmxhdHBpY2tyQWx0SW5wdXQgJiZcclxuICAgICAgdGhpcy5mbGF0cGlja3IuYWx0SW5wdXQgJiZcclxuICAgICAgY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgncGxhY2Vob2xkZXInKSAmJlxyXG4gICAgICBjaGFuZ2VzWydwbGFjZWhvbGRlciddLmN1cnJlbnRWYWx1ZVxyXG4gICAgKSB7XHJcbiAgICAgIHRoaXMuZmxhdHBpY2tyLmFsdElucHV0LnNldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInLCBjaGFuZ2VzWydwbGFjZWhvbGRlciddLmN1cnJlbnRWYWx1ZSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ09uRGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLmZsYXRwaWNrcikge1xyXG4gICAgICB0aGlzLmZsYXRwaWNrci5kZXN0cm95KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZm9ybUNvbnRyb2xMaXN0ZW5lcikge1xyXG4gICAgICB0aGlzLmZvcm1Db250cm9sTGlzdGVuZXIudW5zdWJzY3JpYmUoKTtcclxuICAgICAgdGhpcy5mb3JtQ29udHJvbExpc3RlbmVyID0gdW5kZWZpbmVkO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZmxhdHBpY2tyT25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEZsYXRwaWNrckV2ZW50PigpO1xyXG4gICAgdGhpcy5mbGF0cGlja3JPbkNsb3NlID0gbmV3IEV2ZW50RW1pdHRlcjxGbGF0cGlja3JFdmVudD4oKTtcclxuICAgIHRoaXMuZmxhdHBpY2tyT25PcGVuID0gbmV3IEV2ZW50RW1pdHRlcjxGbGF0cGlja3JFdmVudD4oKTtcclxuICAgIHRoaXMuZmxhdHBpY2tyT25SZWFkeSA9IG5ldyBFdmVudEVtaXR0ZXI8RmxhdHBpY2tyRXZlbnQ+KCk7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICAgIHRoaXMuZ2xvYmFsT25DaGFuZ2UgPSB0aGlzLmZsYXRwaWNrck9wdGlvbnMgPyB0aGlzLmZsYXRwaWNrck9wdGlvbnMub25DaGFuZ2UgOiB1bmRlZmluZWQ7XHJcbiAgICB0aGlzLmdsb2JhbE9uQ2xvc2UgPSB0aGlzLmZsYXRwaWNrck9wdGlvbnMgPyB0aGlzLmZsYXRwaWNrck9wdGlvbnMub25DbG9zZSA6IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuZ2xvYmFsT25PcGVuID0gdGhpcy5mbGF0cGlja3JPcHRpb25zID8gdGhpcy5mbGF0cGlja3JPcHRpb25zLm9uT3BlbiA6IHVuZGVmaW5lZDtcclxuICAgIHRoaXMuZ2xvYmFsT25SZWFkeSA9IHRoaXMuZmxhdHBpY2tyT3B0aW9ucyA/IHRoaXMuZmxhdHBpY2tyT3B0aW9ucy5vblJlYWR5IDogdW5kZWZpbmVkO1xyXG5cclxuICAgIHRoaXMuZmxhdHBpY2tyT3B0aW9ucyA9IHtcclxuICAgICAgYWx0Rm9ybWF0OiB0aGlzLmdldE9wdGlvbignYWx0Rm9ybWF0JyksXHJcbiAgICAgIGFsdElucHV0OiB0aGlzLmdldE9wdGlvbignYWx0SW5wdXQnKSxcclxuICAgICAgYWx0SW5wdXRDbGFzczogdGhpcy5nZXRPcHRpb24oJ2FsdElucHV0Q2xhc3MnKSxcclxuICAgICAgYWxsb3dJbnB1dDogdGhpcy5nZXRPcHRpb24oJ2FsbG93SW5wdXQnKSxcclxuICAgICAgYXBwZW5kVG86IHRoaXMuZ2V0T3B0aW9uKCdhcHBlbmRUbycpLFxyXG4gICAgICBjbGlja09wZW5zOiB0aGlzLmdldE9wdGlvbignY2xpY2tPcGVucycsIHRydWUpLFxyXG4gICAgICBkYXRlRm9ybWF0OiB0aGlzLmdldE9wdGlvbignZGF0ZUZvcm1hdCcpLFxyXG4gICAgICBkZWZhdWx0RGF0ZTogdGhpcy5nZXRPcHRpb24oJ2RlZmF1bHREYXRlJyksXHJcbiAgICAgIGRpc2FibGU6IHRoaXMuZ2V0T3B0aW9uKCdkaXNhYmxlJyksXHJcbiAgICAgIGRpc2FibGVNb2JpbGU6IHRoaXMuZ2V0T3B0aW9uKCdkaXNhYmxlTW9iaWxlJyksXHJcbiAgICAgIGVuYWJsZTogdGhpcy5nZXRPcHRpb24oJ2VuYWJsZScpLFxyXG4gICAgICBlbmFibGVUaW1lOiB0aGlzLmdldE9wdGlvbignZW5hYmxlVGltZScpLFxyXG4gICAgICBlbmFibGVTZWNvbmRzOiB0aGlzLmdldE9wdGlvbignZW5hYmxlU2Vjb25kcycpLFxyXG4gICAgICBob3VySW5jcmVtZW50OiB0aGlzLmdldE9wdGlvbignaG91ckluY3JlbWVudCcpLFxyXG4gICAgICBpbmxpbmU6IHRoaXMuZ2V0T3B0aW9uKCdpbmxpbmUnKSxcclxuICAgICAgbG9jYWxlOiB0aGlzLmdldE9wdGlvbignbG9jYWxlJyksXHJcbiAgICAgIG1heERhdGU6IHRoaXMuZ2V0T3B0aW9uKCdtYXhEYXRlJyksXHJcbiAgICAgIG1pbkRhdGU6IHRoaXMuZ2V0T3B0aW9uKCdtaW5EYXRlJyksXHJcbiAgICAgIG1pbnV0ZUluY3JlbWVudDogdGhpcy5nZXRPcHRpb24oJ21pbnV0ZUluY3JlbWVudCcpLFxyXG4gICAgICBtb2RlOiB0aGlzLmdldE9wdGlvbignbW9kZScpLFxyXG4gICAgICBuZXh0QXJyb3c6IHRoaXMuZ2V0T3B0aW9uKCduZXh0QXJyb3cnKSxcclxuICAgICAgbm9DYWxlbmRhcjogdGhpcy5nZXRPcHRpb24oJ25vQ2FsZW5kYXInKSxcclxuICAgICAgb25DaGFuZ2U6IHRoaXMuZXZlbnRPbkNoYW5nZS5iaW5kKHRoaXMpLFxyXG4gICAgICBvbkNsb3NlOiB0aGlzLmV2ZW50T25DbG9zZS5iaW5kKHRoaXMpLFxyXG4gICAgICBvbk9wZW46IHRoaXMuZXZlbnRPbk9wZW4uYmluZCh0aGlzKSxcclxuICAgICAgb25SZWFkeTogdGhpcy5ldmVudE9uUmVhZHkuYmluZCh0aGlzKSxcclxuICAgICAgcGFyc2VEYXRlOiB0aGlzLmdldE9wdGlvbigncGFyc2VEYXRlJyksXHJcbiAgICAgIHByZXZBcnJvdzogdGhpcy5nZXRPcHRpb24oJ3ByZXZBcnJvdycpLFxyXG4gICAgICBzaG9ydGhhbmRDdXJyZW50TW9udGg6IHRoaXMuZ2V0T3B0aW9uKCdzaG9ydGhhbmRDdXJyZW50TW9udGgnKSxcclxuICAgICAgc3RhdGljOiB0aGlzLmdldE9wdGlvbignc3RhdGljJyksXHJcbiAgICAgIHRpbWVfMjRocjogdGhpcy5nZXRPcHRpb24oJ3RpbWVfMjRocicpLFxyXG4gICAgICB1dGM6IHRoaXMuZ2V0T3B0aW9uKCd1dGMnKSxcclxuICAgICAgd2Vla051bWJlcnM6IHRoaXMuZ2V0T3B0aW9uKCd3ZWVrTnVtYmVycycpLFxyXG4gICAgICB3cmFwOiB0aGlzLmdldE9wdGlvbignd3JhcCcsIHRydWUpLFxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBSZW1vdmUgdW5zZXQgcHJvcGVydGllc1xyXG4gICAgT2JqZWN0LmtleXModGhpcy5mbGF0cGlja3JPcHRpb25zKS5mb3JFYWNoKChrZXk6IHN0cmluZykgPT4ge1xyXG4gICAgICBpZiAodGhpcy5mbGF0cGlja3JPcHRpb25zICYmIHRoaXMuZmxhdHBpY2tyT3B0aW9uc1trZXldID09PSB1bmRlZmluZWQpIHtcclxuICAgICAgICBkZWxldGUgdGhpcy5mbGF0cGlja3JPcHRpb25zW2tleV07XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGlmICh0aGlzLmNvbnRyb2wpIHtcclxuICAgICAgdGhpcy5mb3JtQ29udHJvbExpc3RlbmVyID0gdGhpcy5jb250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHZhbHVlOiBhbnkpID0+IHtcclxuICAgICAgICBpZiAoISh2YWx1ZSBpbnN0YW5jZW9mIERhdGUpKSB7XHJcbiAgICAgICAgICAvLyBRdWlldGx5IHVwZGF0ZSB0aGUgdmFsdWUgb2YgdGhlIGZvcm0gY29udHJvbCB0byBiZSBhXHJcbiAgICAgICAgICAvLyBEYXRlIG9iamVjdC4gVGhpcyBhdm9pZHMgYW55IGV4dGVybmFsIHN1YnNjcmliZXJzXHJcbiAgICAgICAgICAvLyBmcm9tIGJlaW5nIG5vdGlmaWVkIGEgc2Vjb25kIHRpbWUgKG9uY2UgZm9yIHRoZSB1c2VyXHJcbiAgICAgICAgICAvLyBpbml0aWF0ZWQgZXZlbnQsIGFuZCBvbmNlIGZvciBvdXIgY29udmVyc2lvbiB0b1xyXG4gICAgICAgICAgLy8gRGF0ZSgpKS5cclxuICAgICAgICAgIHRoaXMuY29udHJvbC5zZXRWYWx1ZShuZXcgRGF0ZSgnJyArIHZhbHVlKSwge1xyXG4gICAgICAgICAgICBvbmx5U2VsZjogdHJ1ZSxcclxuICAgICAgICAgICAgZW1pdEV2ZW50OiBmYWxzZSxcclxuICAgICAgICAgICAgZW1pdE1vZGVsVG9WaWV3Q2hhbmdlOiBmYWxzZSxcclxuICAgICAgICAgICAgZW1pdFZpZXdUb01vZGVsQ2hhbmdlOiBmYWxzZSxcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGaXJlIG9mZiB0aGUgZXZlbnQgZW1pdHRlciBmb3IgdGhlIGRpcmVjdGl2ZSBlbGVtZW50LCBhbmQgYWxzbyBmb3IgdGhlXHJcbiAgICogZ2xvYmFsIG9uQ2hhbmdlIGNhbGxiYWNrLCBpZiBkZWZpbmVkLlxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBldmVudE9uQ2hhbmdlKHNlbGVjdGVkRGF0ZXM6IERhdGVbXSwgZGF0ZVN0cjogc3RyaW5nLCBpbnN0YW5jZTogT2JqZWN0KTogdm9pZCB7XHJcbiAgICBsZXQgZXZlbnQ6IEZsYXRwaWNrckV2ZW50ID0ge1xyXG4gICAgICBzZWxlY3RlZERhdGVzOiBzZWxlY3RlZERhdGVzLFxyXG4gICAgICBkYXRlU3RyOiBkYXRlU3RyLFxyXG4gICAgICBpbnN0YW5jZTogaW5zdGFuY2UsXHJcbiAgICB9O1xyXG4gICAgaWYgKHRoaXMuZmxhdHBpY2tyT25DaGFuZ2UpIHtcclxuICAgICAgdGhpcy5mbGF0cGlja3JPbkNoYW5nZS5lbWl0KGV2ZW50KTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmdsb2JhbE9uQ2hhbmdlKSB7XHJcbiAgICAgIHRoaXMuZ2xvYmFsT25DaGFuZ2UoZXZlbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRmlyZSBvZmYgdGhlIGV2ZW50IGVtaXR0ZXIgZm9yIHRoZSBkaXJlY3RpdmUgZWxlbWVudCwgYW5kIGFsc28gZm9yIHRoZVxyXG4gICAqIGdsb2JhbCBvbkNsb3NlIGNhbGxiYWNrLCBpZiBkZWZpbmVkLlxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBldmVudE9uQ2xvc2Uoc2VsZWN0ZWREYXRlczogRGF0ZVtdLCBkYXRlU3RyOiBzdHJpbmcsIGluc3RhbmNlOiBPYmplY3QpOiB2b2lkIHtcclxuICAgIGxldCBldmVudDogRmxhdHBpY2tyRXZlbnQgPSB7XHJcbiAgICAgIHNlbGVjdGVkRGF0ZXM6IHNlbGVjdGVkRGF0ZXMsXHJcbiAgICAgIGRhdGVTdHI6IGRhdGVTdHIsXHJcbiAgICAgIGluc3RhbmNlOiBpbnN0YW5jZSxcclxuICAgIH07XHJcbiAgICBpZiAodGhpcy5mbGF0cGlja3JPbkNsb3NlKSB7XHJcbiAgICAgIHRoaXMuZmxhdHBpY2tyT25DbG9zZS5lbWl0KGV2ZW50KTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmdsb2JhbE9uQ2xvc2UpIHtcclxuICAgICAgdGhpcy5nbG9iYWxPbkNsb3NlKGV2ZW50KTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEZpcmUgb2ZmIHRoZSBldmVudCBlbWl0dGVyIGZvciB0aGUgZGlyZWN0aXZlIGVsZW1lbnQsIGFuZCBhbHNvIGZvciB0aGVcclxuICAgKiBnbG9iYWwgb25PcGVuIGNhbGxiYWNrLCBpZiBkZWZpbmVkLlxyXG4gICAqL1xyXG4gIHByb3RlY3RlZCBldmVudE9uT3BlbihzZWxlY3RlZERhdGVzOiBEYXRlW10sIGRhdGVTdHI6IHN0cmluZywgaW5zdGFuY2U6IE9iamVjdCk6IHZvaWQge1xyXG4gICAgbGV0IGV2ZW50OiBGbGF0cGlja3JFdmVudCA9IHtcclxuICAgICAgc2VsZWN0ZWREYXRlczogc2VsZWN0ZWREYXRlcyxcclxuICAgICAgZGF0ZVN0cjogZGF0ZVN0cixcclxuICAgICAgaW5zdGFuY2U6IGluc3RhbmNlLFxyXG4gICAgfTtcclxuICAgIGlmICh0aGlzLmZsYXRwaWNrck9uT3Blbikge1xyXG4gICAgICB0aGlzLmZsYXRwaWNrck9uT3Blbi5lbWl0KGV2ZW50KTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmdsb2JhbE9uT3Blbikge1xyXG4gICAgICB0aGlzLmdsb2JhbE9uT3BlbihldmVudCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGaXJlIG9mZiB0aGUgZXZlbnQgZW1pdHRlciBmb3IgdGhlIGRpcmVjdGl2ZSBlbGVtZW50LCBhbmQgYWxzbyBmb3IgdGhlXHJcbiAgICogZ2xvYmFsIG9uUmVhZHkgY2FsbGJhY2ssIGlmIGRlZmluZWQuXHJcbiAgICovXHJcbiAgcHJvdGVjdGVkIGV2ZW50T25SZWFkeShzZWxlY3RlZERhdGVzOiBEYXRlW10sIGRhdGVTdHI6IHN0cmluZywgaW5zdGFuY2U6IE9iamVjdCk6IHZvaWQge1xyXG4gICAgbGV0IGV2ZW50OiBGbGF0cGlja3JFdmVudCA9IHtcclxuICAgICAgc2VsZWN0ZWREYXRlczogc2VsZWN0ZWREYXRlcyxcclxuICAgICAgZGF0ZVN0cjogZGF0ZVN0cixcclxuICAgICAgaW5zdGFuY2U6IGluc3RhbmNlLFxyXG4gICAgfTtcclxuICAgIGlmICh0aGlzLmZsYXRwaWNrck9uUmVhZHkpIHtcclxuICAgICAgdGhpcy5mbGF0cGlja3JPblJlYWR5LmVtaXQoZXZlbnQpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuZ2xvYmFsT25SZWFkeSkge1xyXG4gICAgICB0aGlzLmdsb2JhbE9uUmVhZHkoZXZlbnQpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJuIHRoZSBjb25maWd1cmF0aW9uIHZhbHVlIGZvciBvcHRpb24ge29wdGlvbn0sIG9yIHtkZWZhdWx0VmFsdWV9IGlmIGl0XHJcbiAgICogZG9lc24ndCBleGlzdC5cclxuICAgKi9cclxuICBwcm90ZWN0ZWQgZ2V0T3B0aW9uKG9wdGlvbjogc3RyaW5nLCBkZWZhdWx0VmFsdWU/OiBhbnkpOiBhbnkge1xyXG4gICAgbGV0IGxvY2FsTmFtZSA9ICdmbGF0cGlja3InICsgb3B0aW9uLnN1YnN0cmluZygwLCAxKS50b1VwcGVyQ2FzZSgpICsgb3B0aW9uLnN1YnN0cmluZygxKTtcclxuXHJcbiAgICBpZiAodHlwZW9mIHRoaXNbbG9jYWxOYW1lXSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgcmV0dXJuIHRoaXNbbG9jYWxOYW1lXTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5mbGF0cGlja3JPcHRpb25zICYmIHR5cGVvZiB0aGlzLmZsYXRwaWNrck9wdGlvbnNbb3B0aW9uXSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgcmV0dXJuIHRoaXMuZmxhdHBpY2tyT3B0aW9uc1tvcHRpb25dO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19