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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWZsYXRwaWNrci5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZzItZmxhdHBpY2tyL3NyYy9saWIvbmcyLWZsYXRwaWNrci5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFlBQVksRUFDWixLQUFLLEVBSUwsTUFBTSxFQUNOLFNBQVMsR0FFVixNQUFNLGVBQWUsQ0FBQztBQUt2QixPQUFPLEVBQUUsZ0JBQWdCLEVBQWUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7OztBQU0xRSxNQUFNLE9BQU8scUJBQXFCO0lBMFFoQyw2REFBNkQ7SUFFdEQsT0FBTztRQUNaLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDO1NBQ3pCO0lBQ0gsQ0FBQztJQWFELFlBQ1ksTUFBd0IsRUFDeEIsU0FBb0IsRUFDcEIsT0FBbUIsRUFDbkIsUUFBbUI7UUFIbkIsV0FBTSxHQUFOLE1BQU0sQ0FBa0I7UUFDeEIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixZQUFPLEdBQVAsT0FBTyxDQUFZO1FBQ25CLGFBQVEsR0FBUixRQUFRLENBQVc7UUFuRC9COzs7O1dBSUc7UUFDd0Isc0JBQWlCLEdBQWlDLElBQUksWUFBWSxFQUFFLENBQUM7UUFFaEc7Ozs7V0FJRztRQUN1QixxQkFBZ0IsR0FBaUMsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUU5Rjs7OztXQUlHO1FBQ3NCLG9CQUFlLEdBQWlDLElBQUksWUFBWSxFQUFFLENBQUM7UUFFNUY7Ozs7V0FJRztRQUN1QixxQkFBZ0IsR0FBaUMsSUFBSSxZQUFZLEVBQUUsQ0FBQztJQTBCM0YsQ0FBQztJQUVKLElBQUksT0FBTztRQUNULElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEs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QUFvQjtzQkFBaEQsS0FBSzt1QkFBQyxhQUFhO2dCQU9FLGFBQWE7c0JBQWxDLEtBQUs7dUJBQUMsTUFBTTtnQkFPYyxpQkFBaUI7c0JBQTNDLE1BQU07dUJBQUMsVUFBVTtnQkFPUSxnQkFBZ0I7c0JBQXpDLE1BQU07dUJBQUMsU0FBUztnQkFPUSxlQUFlO3NCQUF2QyxNQUFNO3VCQUFDLFFBQVE7Z0JBT1UsZ0JBQWdCO3NCQUF6QyxNQUFNO3VCQUFDLFNBQVM7Z0JBSVYsT0FBTztzQkFEYixZQUFZO3VCQUFDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjIsXG4gIFNpbXBsZUNoYW5nZXMsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRmxhdHBpY2tyT3B0aW9ucyB9IGZyb20gJy4vZmxhdHBpY2tyLW9wdGlvbnMuaW50ZXJmYWNlJztcbmltcG9ydCB7IEZsYXRwaWNrckV2ZW50IH0gZnJvbSAnLi9mbGF0cGlja3ItZXZlbnQuaW50ZXJmYWNlJztcbmltcG9ydCB7IEZsYXRwaWNrckluc3RhbmNlIH0gZnJvbSAnLi9mbGF0cGlja3ItaW5zdGFuY2UnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBDb250cm9sQ29udGFpbmVyLCBGb3JtQ29udHJvbCwgTmdDb250cm9sIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbZmxhdHBpY2tyXScsXG4gIGV4cG9ydEFzOiAnbmcyLWZsYXRwaWNrcicsXG59KVxuZXhwb3J0IGNsYXNzIE5nMkZsYXRwaWNrckRpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSwgT25Jbml0LCBPbkNoYW5nZXMge1xuICAvKipcbiAgICogVGhlIGZsYXRwaWNrciBjb25maWd1cmF0aW9uIGFzIGEgc2luZ2xlIG9iamVjdCBvZiB2YWx1ZXMuXG4gICAqXG4gICAqIFNlZSBodHRwczovL2NobWxuLmdpdGh1Yi5pby9mbGF0cGlja3Ivb3B0aW9ucy8gZm9yIGZ1bGwgbGlzdC5cbiAgICovXG4gIEBJbnB1dCgnZmxhdHBpY2tyJykgcHVibGljIGZsYXRwaWNrck9wdGlvbnM6IEZsYXRwaWNrck9wdGlvbnMgfCB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIFBsYWNlaG9sZGVyIGZvciBpbnB1dCBmaWVsZC5cbiAgICpcbiAgICogRGVmYXVsdDogIG51bGxcbiAgICovXG4gIEBJbnB1dCgncGxhY2Vob2xkZXInKSBwdWJsaWMgcGxhY2Vob2xkZXI6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogRXhhY3RseSB0aGUgc2FtZSBhcyBkYXRlIGZvcm1hdCwgYnV0IGZvciB0aGUgYWx0SW5wdXQgZmllbGQuXG4gICAqXG4gICAqIERlZmF1bHQ6ICBcIkYgaiwgWVwiXG4gICAqL1xuICBASW5wdXQoJ2FsdEZvcm1hdCcpIHB1YmxpYyBmbGF0cGlja3JBbHRGb3JtYXQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogU2hvdyB0aGUgdXNlciBhIHJlYWRhYmxlIGRhdGUgKGFzIHBlciBhbHRGb3JtYXQpLCBidXQgcmV0dXJuIHNvbWV0aGluZ1xuICAgKiB0b3RhbGx5IGRpZmZlcmVudCB0byB0aGUgc2VydmVyLlxuICAgKlxuICAgKiBEZWZhdWx0OiAgZmFsc2VcbiAgICovXG4gIEBJbnB1dCgnYWx0SW5wdXQnKSBwdWJsaWMgZmxhdHBpY2tyQWx0SW5wdXQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIFRoaXMgY2xhc3Mgd2lsbCBiZSBhZGRlZCB0byB0aGUgaW5wdXQgZWxlbWVudCBjcmVhdGVkIGJ5IHRoZSBhbHRJbnB1dFxuICAgKiBvcHRpb24uXG4gICAqXG4gICAqIERlZmF1bHQ6ICBcIlwiXG4gICAqL1xuICBASW5wdXQoJ2FsdElucHV0Q2xhc3MnKSBwdWJsaWMgZmxhdHBpY2tyQWx0SW5wdXRDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBBbGxvd3MgdGhlIHVzZXIgdG8gZW50ZXIgYSBkYXRlIGRpcmVjdGx5IGlucHV0IHRoZSBpbnB1dCBmaWVsZC4gQnlcbiAgICogZGVmYXVsdCwgZGlyZWN0IGVudHJ5IGlzIGRpc2FibGVkLlxuICAgKlxuICAgKiBEZWZhdWx0OiAgZmFsc2VcbiAgICovXG4gIEBJbnB1dCgnYWxsb3dJbnB1dCcpIHB1YmxpYyBmbGF0cGlja3JBbGxvd0lucHV0OiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBJbnN0ZWFkIG9mIGJvZHksIGFwcGVuZHMgdGhlIGNhbGVuZGFyIHRvIHRoZSBzcGVjaWZpZWQgbm9kZSBpbnN0ZWFkLlxuICAgKlxuICAgKiBEZWZhdWx0OiAgbnVsbFxuICAgKi9cbiAgQElucHV0KCdhcHBlbmRUbycpIHB1YmxpYyBmbGF0cGlja3JBcHBlbmRUbzogYW55OyAvLyBIVE1MRWxlbWVudFxuXG4gIC8qKlxuICAgKiBXaGV0aGVyIGNsaWNraW5nIG9uIHRoZSBpbnB1dCBzaG91bGQgb3BlbiB0aGUgcGlja2VyLlxuICAgKiBZb3UgY291bGQgZGlzYWJsZSB0aGlzIGlmIHlvdSB3aXNoIHRvIG9wZW4gdGhlIGNhbGVuZGFyIG1hbnVhbGx5XG4gICAqIHdpdGgub3BlbigpLlxuICAgKlxuICAgKiBEZWZhdWx0OiAgdHJ1ZVxuICAgKi9cbiAgQElucHV0KCdjbGlja09wZW5zJykgcHVibGljIGZsYXRwaWNrckNsaWNrT3BlbnM6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIEEgc3RyaW5nIG9mIGNoYXJhY3RlcnMgd2hpY2ggYXJlIHVzZWQgdG8gZGVmaW5lIGhvdyB0aGUgZGF0ZSB3aWxsIGJlXG4gICAqIGRpc3BsYXllZCBpbiB0aGUgaW5wdXQgYm94LlxuICAgKiBTZWUgaHR0cHM6Ly9jaG1sbi5naXRodWIuaW8vZmxhdHBpY2tyL2Zvcm1hdHRpbmcvIGZvciBzdXBwb3J0ZWQgdG9rZW5zLlxuICAgKlxuICAgKiBEZWZhdWx0OiAgXCJZLW0tZFwiXG4gICAqL1xuICBASW5wdXQoJ2RhdGVGb3JtYXQnKSBwdWJsaWMgZmxhdHBpY2tyRGF0ZUZvcm1hdDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBTZXRzIHRoZSBpbml0aWFsIHNlbGVjdGVkIGRhdGUocykuXG4gICAqXG4gICAqIElmIHlvdSdyZSB1c2luZyB7bW9kZTogXCJtdWx0aXBsZVwifSBvciBhIHJhbmdlIGNhbGVuZGFyIHN1cHBseSBhbiBBcnJheSBvZlxuICAgKiBEYXRlIG9iamVjdHMgb3IgYW4gQXJyYXkgb2YgZGF0ZSBzdHJpbmdzIHdoaWNoIGZvbGxvdyB5b3VyIGRhdGVGb3JtYXQuXG4gICAqXG4gICAqIE90aGVyd2lzZSwgeW91IGNhbiBzdXBwbHkgYSBzaW5nbGUgRGF0ZSBvYmplY3Qgb3IgYSBkYXRlIHN0cmluZy5cbiAgICpcbiAgICogRGVmYXVsdDogIG51bGxcbiAgICovXG4gIEBJbnB1dCgnZGVmYXVsdERhdGUnKSBwdWJsaWMgZmxhdHBpY2tyRGVmYXVsdERhdGU6IHN0cmluZyB8IERhdGUgfCBzdHJpbmdbXSB8IERhdGVbXSB8IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogRGlzYWJsZSBhbiBhcnJheSBvZiBzcGVjaWZpYyBkYXRlcywgZGF0ZSByYW5nZXMsIG9yIGZ1bmN0aW9ucyB0byBkaXNhYmxlXG4gICAqIGRhdGVzLiBTZWUgaHR0cHM6Ly9jaG1sbi5naXRodWIuaW8vZmxhdHBpY2tyL2V4YW1wbGVzLyNkaXNhYmxpbmctc3BlY2lmaWMtZGF0ZXNcbiAgICpcbiAgICogRGVmYXVsdDogIFtdXG4gICAqL1xuICBASW5wdXQoJ2Rpc2FibGUnKSBwdWJsaWMgZmxhdHBpY2tyRGlzYWJsZTogc3RyaW5nW10gfCBEYXRlW10gfCBGdW5jdGlvbiB8IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogU2V0IGRpc2FibGVNb2JpbGUgdG8gdHJ1ZSB0byBhbHdheXMgdXNlIHRoZSBub24tbmF0aXZlIHBpY2tlci4gQnlcbiAgICogZGVmYXVsdCwgRmxhdHBpY2tyIHV0aWxpemVzIG5hdGl2ZSBkYXRldGltZSB3aWRnZXRzIHVubGVzcyBjZXJ0YWluXG4gICAqIG9wdGlvbnMgKGUuZy4gZGlzYWJsZSkgYXJlIHVzZWQuXG4gICAqXG4gICAqIERlZmF1bHQ6ICBmYWxzZVxuICAgKi9cbiAgQElucHV0KCdkaXNhYmxlTW9iaWxlJykgcHVibGljIGZsYXRwaWNrckRpc2FibGVNb2JpbGU6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIEVuYWJsZSBhbiBhcnJheSBvZiBzcGVjaWZpYyBkYXRlcywgZGF0ZSByYW5nZXMsIG9yIGZ1bmN0aW9ucyB0byBlbmFibGVcbiAgICogZGF0ZXMuIFNlZSBodHRwczovL2NobWxuLmdpdGh1Yi5pby9mbGF0cGlja3IvZXhhbXBsZXMvI2Rpc2FibGluZy1hbGwtZGF0ZXMtZXhjZXB0LXNlbGVjdC1mZXdcbiAgICpcbiAgICogRGVmYXVsdDogIFtdXG4gICAqL1xuICBASW5wdXQoJ2VuYWJsZScpIHB1YmxpYyBmbGF0cGlja3JFbmFibGU6IHN0cmluZ1tdIHwgRGF0ZVtdIHwgRnVuY3Rpb24gfCB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIEVuYWJsZXMgdGltZSBwaWNrZXIuXG4gICAqXG4gICAqIERlZmF1bHQ6ICBmYWxzZVxuICAgKi9cbiAgQElucHV0KCdlbmFibGVUaW1lJykgcHVibGljIGZsYXRwaWNrckVuYWJsZVRpbWU6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIEVuYWJsZXMgc2Vjb25kcyBpbiB0aGUgdGltZSBwaWNrZXIuXG4gICAqXG4gICAqIERlZmF1bHQ6ICBmYWxzZVxuICAgKi9cbiAgQElucHV0KCdlbmFibGVTZWNvbmRzJykgcHVibGljIGZsYXRwaWNrckVuYWJsZVNlY29uZHM6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIEFkanVzdHMgdGhlIHN0ZXAgZm9yIHRoZSBob3VyIGlucHV0IChpbmNsLiBzY3JvbGxpbmcpLlxuICAgKlxuICAgKiBEZWZhdWx0OiAgMVxuICAgKi9cbiAgQElucHV0KCdob3VySW5jcmVtZW50JykgcHVibGljIGZsYXRwaWNrckhvdXJJbmNyZW1lbnQ6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogRGlzcGxheXMgdGhlIGNhbGVuZGFyIGlubGluZS5cbiAgICpcbiAgICogRGVmYXVsdDogIGZhbHNlXG4gICAqL1xuICBASW5wdXQoJ2lubGluZScpIHB1YmxpYyBmbGF0cGlja3JJbmxpbmU6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIFVzZSBhIHNwZWNpZmljIGxvY2FsZSBmb3IgdGhlIGZsYXRwaWNrciBpbnN0YW5jZS5cbiAgICpcbiAgICogRGVmYXVsdDogIG51bGxcbiAgICovXG4gIEBJbnB1dCgnbG9jYWxlJykgcHVibGljIGZsYXRwaWNrckxvY2FsZTogT2JqZWN0IHwgdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBUaGUgbWF4aW11bSBkYXRlIHRoYXQgYSB1c2VyIGNhbiBwaWNrIHRvIChpbmNsdXNpdmUpLlxuICAgKlxuICAgKiBEZWZhdWx0OiAgbnVsbFxuICAgKi9cbiAgQElucHV0KCdtYXhEYXRlJykgcHVibGljIGZsYXRwaWNrck1heERhdGU6IHN0cmluZyB8IERhdGUgfCB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIFRoZSBtaW5pbXVtIGRhdGUgdGhhdCBhIHVzZXIgY2FuIHN0YXJ0IHBpY2tpbmcgZnJvbSAoaW5jbHVzaXZlKS5cbiAgICpcbiAgICogRGVmYXVsdDogIG51bGxcbiAgICovXG4gIEBJbnB1dCgnbWluRGF0ZScpIHB1YmxpYyBmbGF0cGlja3JNaW5EYXRlOiBzdHJpbmcgfCBEYXRlIHwgdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBBZGp1c3RzIHRoZSBzdGVwIGZvciB0aGUgbWludXRlIGlucHV0IChpbmNsLiBzY3JvbGxpbmcpLlxuICAgKlxuICAgKiBEZWZhdWx0OiAgNVxuICAgKi9cbiAgQElucHV0KCdtaW51dGVJbmNyZW1lbnQnKSBwdWJsaWMgZmxhdHBpY2tyTWludXRlSW5jcmVtZW50OiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIFwic2luZ2xlXCIsIFwibXVsdGlwbGVcIiwgb3IgXCJyYW5nZVwiXG4gICAqXG4gICAqIERlZmF1bHQ6ICBcInNpbmdsZVwiXG4gICAqL1xuICBASW5wdXQoJ21vZGUnKSBwdWJsaWMgZmxhdHBpY2tyTW9kZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBIVE1MIGZvciB0aGUgYXJyb3cgaWNvbiwgdXNlZCB0byBzd2l0Y2ggbW9udGhzLlxuICAgKlxuICAgKiBEZWZhdWx0OiAgXCI+XCJcbiAgICovXG4gIEBJbnB1dCgnbmV4dEFycm93JykgcHVibGljIGZsYXRwaWNrck5leHRBcnJvdzogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBIaWRlcyB0aGUgZGF5IHNlbGVjdGlvbiBpbiBjYWxlbmRhci4gVXNlIGl0IGFsb25nIHdpdGggZW5hYmxlVGltZSB0b1xuICAgKiBjcmVhdGUgYSB0aW1lIHBpY2tlci5cbiAgICpcbiAgICogRGVmYXVsdDogIGZhbHNlXG4gICAqL1xuICBASW5wdXQoJ25vQ2FsZW5kYXInKSBwdWJsaWMgZmxhdHBpY2tyTm9DYWxlbmRhcjogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogRnVuY3Rpb24gdGhhdCBleHBlY3RzIGEgZGF0ZSBzdHJpbmcgYW5kIG11c3QgcmV0dXJuIGEgRGF0ZSBvYmplY3QuXG4gICAqXG4gICAqIERlZmF1bHQ6ICBmYWxzZVxuICAgKi9cbiAgQElucHV0KCdwYXJzZURhdGUnKSBwdWJsaWMgZmxhdHBpY2tyUGFyc2VEYXRlOiBGdW5jdGlvbiB8IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogSFRNTCBmb3IgdGhlIGxlZnQgYXJyb3cgaWNvbi5cbiAgICpcbiAgICogRGVmYXVsdDogIFwiPFwiXG4gICAqL1xuICBASW5wdXQoJ3ByZXZBcnJvdycpIHB1YmxpYyBmbGF0cGlja3JQcmV2QXJyb3c6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogU2hvdyB0aGUgbW9udGggdXNpbmcgdGhlIHNob3J0aGFuZCB2ZXJzaW9uIChpZSwgU2VwIGluc3RlYWQgb2YgU2VwdGVtYmVyKS5cbiAgICpcbiAgICogRGVmYXVsdDogIGZhbHNlXG4gICAqL1xuICBASW5wdXQoJ3Nob3J0aGFuZEN1cnJlbnRNb250aCcpIHB1YmxpYyBmbGF0cGlja3JTaG9ydGhhbmRDdXJyZW50TW9udGg6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIFBvc2l0aW9uIHRoZSBjYWxlbmRhciBpbnNpZGUgdGhlIHdyYXBwZXIgYW5kIG5leHQgdG8gdGhlIGlucHV0IGVsZW1lbnRcbiAgICogKExlYXZlIGZhbHNlIHVubGVzcyB5b3Uga25vdyB3aGF0IHlvdSdyZSBkb2luZykuXG4gICAqXG4gICAqIERlZmF1bHQ6ICBmYWxzZVxuICAgKi9cbiAgQElucHV0KCdzdGF0aWMnKSBwdWJsaWMgZmxhdHBpY2tyU3RhdGljOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gIC8qKlxuICAgKiBEaXNwbGF5cyB0aW1lIHBpY2tlciBpbiAyNCBob3VyIG1vZGUgd2l0aG91dCBBTS9QTSBzZWxlY3Rpb24gd2hlbiBlbmFibGVkLlxuICAgKlxuICAgKiBEZWZhdWx0OiAgZmFsc2VcbiAgICovXG4gIEBJbnB1dCgndGltZV8yNGhyJykgcHVibGljIGZsYXRwaWNrclRpbWVfMjRocjogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICBASW5wdXQoJ3V0YycpIHB1YmxpYyBmbGF0cGlja3JVdGM6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIEVuYWJsZXMgZGlzcGxheSBvZiB3ZWVrIG51bWJlcnMgaW4gY2FsZW5kYXIuXG4gICAqXG4gICAqIERlZmF1bHQ6ICBmYWxzZVxuICAgKi9cbiAgQElucHV0KCd3ZWVrTnVtYmVycycpIHB1YmxpYyBmbGF0cGlja3JXZWVrTnVtYmVyczogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogQ3VzdG9tIGVsZW1lbnRzIGFuZCBpbnB1dCBncm91cHMuXG4gICAqXG4gICAqIERlZmF1bHQ6ICBmYWxzZVxuICAgKi9cbiAgQElucHV0KCd3cmFwJykgcHVibGljIGZsYXRwaWNrcldyYXA6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgLyoqXG4gICAqIG9uQ2hhbmdlIGdldHMgdHJpZ2dlcmVkIHdoZW4gdGhlIHVzZXIgc2VsZWN0cyBhIGRhdGUsIG9yIGNoYW5nZXMgdGhlIHRpbWUgb24gYSBzZWxlY3RlZCBkYXRlLlxuICAgKlxuICAgKiBEZWZhdWx0OiAgbnVsbFxuICAgKi9cbiAgQE91dHB1dCgnb25DaGFuZ2UnKSBwdWJsaWMgZmxhdHBpY2tyT25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxGbGF0cGlja3JFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgLyoqXG4gICAqIG9uQ2xvc2UgZ2V0cyB0cmlnZ2VyZWQgd2hlbiB0aGUgY2FsZW5kYXIgaXMgY2xvc2VkLlxuICAgKlxuICAgKiBEZWZhdWx0OiAgbnVsbFxuICAgKi9cbiAgQE91dHB1dCgnb25DbG9zZScpIHB1YmxpYyBmbGF0cGlja3JPbkNsb3NlOiBFdmVudEVtaXR0ZXI8RmxhdHBpY2tyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKlxuICAgKiBvbk9wZW4gZ2V0cyB0cmlnZ2VyZWQgd2hlbiB0aGUgY2FsZW5kYXIgaXMgb3BlbmVkLlxuICAgKlxuICAgKiBEZWZhdWx0OiAgbnVsbFxuICAgKi9cbiAgQE91dHB1dCgnb25PcGVuJykgcHVibGljIGZsYXRwaWNrck9uT3BlbjogRXZlbnRFbWl0dGVyPEZsYXRwaWNrckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICAvKipcbiAgICogb25SZWFkeSBnZXRzIHRyaWdnZXJlZCBvbmNlIHRoZSBjYWxlbmRhciBpcyBpbiBhIHJlYWR5IHN0YXRlLlxuICAgKlxuICAgKiBEZWZhdWx0OiAgbnVsbFxuICAgKi9cbiAgQE91dHB1dCgnb25SZWFkeScpIHB1YmxpYyBmbGF0cGlja3JPblJlYWR5OiBFdmVudEVtaXR0ZXI8RmxhdHBpY2tyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIC8qKiBBbGxvdyBkb3VibGUtY2xpY2tpbmcgb24gdGhlIGNvbnRyb2wgdG8gb3Blbi9jbG9zZSBpdC4gKi9cbiAgQEhvc3RMaXN0ZW5lcignZGJsY2xpY2snKVxuICBwdWJsaWMgb25DbGljaygpIHtcbiAgICBpZiAodGhpcy5mbGF0cGlja3IpIHtcbiAgICAgIHRoaXMuZmxhdHBpY2tyLnRvZ2dsZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBnbG9iYWxPbkNoYW5nZTogRnVuY3Rpb24gfCB1bmRlZmluZWQ7XG4gIHByb3RlY3RlZCBnbG9iYWxPbkNsb3NlOiBGdW5jdGlvbiB8IHVuZGVmaW5lZDtcbiAgcHJvdGVjdGVkIGdsb2JhbE9uT3BlbjogRnVuY3Rpb24gfCB1bmRlZmluZWQ7XG4gIHByb3RlY3RlZCBnbG9iYWxPblJlYWR5OiBGdW5jdGlvbiB8IHVuZGVmaW5lZDtcblxuICBwcm90ZWN0ZWQgZmxhdHBpY2tyOiBGbGF0cGlja3JJbnN0YW5jZSB8IHVuZGVmaW5lZDtcbiAgcHJvdGVjdGVkIGZvcm1Db250cm9sTGlzdGVuZXI6IFN1YnNjcmlwdGlvbiB8IHVuZGVmaW5lZDtcblxuICAvKiogQWxsb3cgYWNjZXNzIHByb3BlcnRpZXMgdXNpbmcgaW5kZXggbm90YXRpb24gKi9cbiAgW2tleTogc3RyaW5nXTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByb3RlY3RlZCBwYXJlbnQ6IENvbnRyb2xDb250YWluZXIsXG4gICAgcHJvdGVjdGVkIG5nQ29udHJvbDogTmdDb250cm9sLFxuICAgIHByb3RlY3RlZCBlbGVtZW50OiBFbGVtZW50UmVmLFxuICAgIHByb3RlY3RlZCByZW5kZXJlcjogUmVuZGVyZXIyLFxuICApIHt9XG5cbiAgZ2V0IGNvbnRyb2woKTogRm9ybUNvbnRyb2wge1xuICAgIGlmICghdGhpcy5wYXJlbnQuZm9ybURpcmVjdGl2ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdOZzJGbGF0cGlja3JEaXJlY3RpdmUgbXVzdCBiZSB1c2VkIHdpdGhpbiBhIGZvcm0gZ3JvdXAnKTtcbiAgICB9XG4gICAgY29uc3QgY29udHJvbCA9IHRoaXMucGFyZW50ID8gdGhpcy5wYXJlbnQuZm9ybURpcmVjdGl2ZS5nZXRDb250cm9sKHRoaXMubmdDb250cm9sKSA6IG51bGw7XG4gICAgaWYgKCFjb250cm9sKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvbnRyb2wgY2Fubm90IGJlIGZvdW5kIGluIHRoZSBmb3JtIGdyb3VwJyk7XG4gICAgfVxuICAgIHJldHVybiBjb250cm9sO1xuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIC8qKiBXZSBjYW5ub3QgaW5pdGlhbGl6ZSB0aGUgZmxhdHBpY2tyIGluc3RhbmNlIGluIG5nT25Jbml0KCk7IGl0IHdpbGxcbiAgICAgcmFuZG9taXplIHRoZSBkYXRlIHdoZW4gdGhlIGZvcm0gY29udHJvbCBpbml0aWFsaXplcy4gKi9cbiAgICBsZXQgbmF0aXZlRWxlbWVudCA9IHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuXG4gICAgaWYgKHR5cGVvZiBuYXRpdmVFbGVtZW50ID09PSAndW5kZWZpbmVkJyB8fCBuYXRpdmVFbGVtZW50ID09PSBudWxsKSB7XG4gICAgICB0aHJvdyAnRXJyb3I6IGludmFsaWQgaW5wdXQgZWxlbWVudCBzcGVjaWZpZWQnO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmZsYXRwaWNrck9wdGlvbnMgJiYgdGhpcy5mbGF0cGlja3JPcHRpb25zLndyYXApIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuZWxlbWVudC5uYXRpdmVFbGVtZW50LCAnZGF0YS1pbnB1dCcsICcnKTtcbiAgICAgIG5hdGl2ZUVsZW1lbnQgPSBuYXRpdmVFbGVtZW50LnBhcmVudE5vZGU7XG4gICAgfVxuXG4gICAgdGhpcy5mbGF0cGlja3IgPSA8RmxhdHBpY2tySW5zdGFuY2U+bmF0aXZlRWxlbWVudC5mbGF0cGlja3IodGhpcy5mbGF0cGlja3JPcHRpb25zKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLmZsYXRwaWNrciAmJlxuICAgICAgdGhpcy5mbGF0cGlja3JBbHRJbnB1dCAmJlxuICAgICAgdGhpcy5mbGF0cGlja3IuYWx0SW5wdXQgJiZcbiAgICAgIGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ3BsYWNlaG9sZGVyJykgJiZcbiAgICAgIGNoYW5nZXNbJ3BsYWNlaG9sZGVyJ10uY3VycmVudFZhbHVlXG4gICAgKSB7XG4gICAgICB0aGlzLmZsYXRwaWNrci5hbHRJbnB1dC5zZXRBdHRyaWJ1dGUoJ3BsYWNlaG9sZGVyJywgY2hhbmdlc1sncGxhY2Vob2xkZXInXS5jdXJyZW50VmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLmZsYXRwaWNrcikge1xuICAgICAgdGhpcy5mbGF0cGlja3IuZGVzdHJveSgpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmZvcm1Db250cm9sTGlzdGVuZXIpIHtcbiAgICAgIHRoaXMuZm9ybUNvbnRyb2xMaXN0ZW5lci51bnN1YnNjcmliZSgpO1xuICAgICAgdGhpcy5mb3JtQ29udHJvbExpc3RlbmVyID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHRoaXMuZmxhdHBpY2tyT25DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEZsYXRwaWNrckV2ZW50PigpO1xuICAgIHRoaXMuZmxhdHBpY2tyT25DbG9zZSA9IG5ldyBFdmVudEVtaXR0ZXI8RmxhdHBpY2tyRXZlbnQ+KCk7XG4gICAgdGhpcy5mbGF0cGlja3JPbk9wZW4gPSBuZXcgRXZlbnRFbWl0dGVyPEZsYXRwaWNrckV2ZW50PigpO1xuICAgIHRoaXMuZmxhdHBpY2tyT25SZWFkeSA9IG5ldyBFdmVudEVtaXR0ZXI8RmxhdHBpY2tyRXZlbnQ+KCk7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmdsb2JhbE9uQ2hhbmdlID0gdGhpcy5mbGF0cGlja3JPcHRpb25zID8gdGhpcy5mbGF0cGlja3JPcHRpb25zLm9uQ2hhbmdlIDogdW5kZWZpbmVkO1xuICAgIHRoaXMuZ2xvYmFsT25DbG9zZSA9IHRoaXMuZmxhdHBpY2tyT3B0aW9ucyA/IHRoaXMuZmxhdHBpY2tyT3B0aW9ucy5vbkNsb3NlIDogdW5kZWZpbmVkO1xuICAgIHRoaXMuZ2xvYmFsT25PcGVuID0gdGhpcy5mbGF0cGlja3JPcHRpb25zID8gdGhpcy5mbGF0cGlja3JPcHRpb25zLm9uT3BlbiA6IHVuZGVmaW5lZDtcbiAgICB0aGlzLmdsb2JhbE9uUmVhZHkgPSB0aGlzLmZsYXRwaWNrck9wdGlvbnMgPyB0aGlzLmZsYXRwaWNrck9wdGlvbnMub25SZWFkeSA6IHVuZGVmaW5lZDtcblxuICAgIHRoaXMuZmxhdHBpY2tyT3B0aW9ucyA9IHtcbiAgICAgIGFsdEZvcm1hdDogdGhpcy5nZXRPcHRpb24oJ2FsdEZvcm1hdCcpLFxuICAgICAgYWx0SW5wdXQ6IHRoaXMuZ2V0T3B0aW9uKCdhbHRJbnB1dCcpLFxuICAgICAgYWx0SW5wdXRDbGFzczogdGhpcy5nZXRPcHRpb24oJ2FsdElucHV0Q2xhc3MnKSxcbiAgICAgIGFsbG93SW5wdXQ6IHRoaXMuZ2V0T3B0aW9uKCdhbGxvd0lucHV0JyksXG4gICAgICBhcHBlbmRUbzogdGhpcy5nZXRPcHRpb24oJ2FwcGVuZFRvJyksXG4gICAgICBjbGlja09wZW5zOiB0aGlzLmdldE9wdGlvbignY2xpY2tPcGVucycsIHRydWUpLFxuICAgICAgZGF0ZUZvcm1hdDogdGhpcy5nZXRPcHRpb24oJ2RhdGVGb3JtYXQnKSxcbiAgICAgIGRlZmF1bHREYXRlOiB0aGlzLmdldE9wdGlvbignZGVmYXVsdERhdGUnKSxcbiAgICAgIGRpc2FibGU6IHRoaXMuZ2V0T3B0aW9uKCdkaXNhYmxlJyksXG4gICAgICBkaXNhYmxlTW9iaWxlOiB0aGlzLmdldE9wdGlvbignZGlzYWJsZU1vYmlsZScpLFxuICAgICAgZW5hYmxlOiB0aGlzLmdldE9wdGlvbignZW5hYmxlJyksXG4gICAgICBlbmFibGVUaW1lOiB0aGlzLmdldE9wdGlvbignZW5hYmxlVGltZScpLFxuICAgICAgZW5hYmxlU2Vjb25kczogdGhpcy5nZXRPcHRpb24oJ2VuYWJsZVNlY29uZHMnKSxcbiAgICAgIGhvdXJJbmNyZW1lbnQ6IHRoaXMuZ2V0T3B0aW9uKCdob3VySW5jcmVtZW50JyksXG4gICAgICBpbmxpbmU6IHRoaXMuZ2V0T3B0aW9uKCdpbmxpbmUnKSxcbiAgICAgIGxvY2FsZTogdGhpcy5nZXRPcHRpb24oJ2xvY2FsZScpLFxuICAgICAgbWF4RGF0ZTogdGhpcy5nZXRPcHRpb24oJ21heERhdGUnKSxcbiAgICAgIG1pbkRhdGU6IHRoaXMuZ2V0T3B0aW9uKCdtaW5EYXRlJyksXG4gICAgICBtaW51dGVJbmNyZW1lbnQ6IHRoaXMuZ2V0T3B0aW9uKCdtaW51dGVJbmNyZW1lbnQnKSxcbiAgICAgIG1vZGU6IHRoaXMuZ2V0T3B0aW9uKCdtb2RlJyksXG4gICAgICBuZXh0QXJyb3c6IHRoaXMuZ2V0T3B0aW9uKCduZXh0QXJyb3cnKSxcbiAgICAgIG5vQ2FsZW5kYXI6IHRoaXMuZ2V0T3B0aW9uKCdub0NhbGVuZGFyJyksXG4gICAgICBvbkNoYW5nZTogdGhpcy5ldmVudE9uQ2hhbmdlLmJpbmQodGhpcyksXG4gICAgICBvbkNsb3NlOiB0aGlzLmV2ZW50T25DbG9zZS5iaW5kKHRoaXMpLFxuICAgICAgb25PcGVuOiB0aGlzLmV2ZW50T25PcGVuLmJpbmQodGhpcyksXG4gICAgICBvblJlYWR5OiB0aGlzLmV2ZW50T25SZWFkeS5iaW5kKHRoaXMpLFxuICAgICAgcGFyc2VEYXRlOiB0aGlzLmdldE9wdGlvbigncGFyc2VEYXRlJyksXG4gICAgICBwcmV2QXJyb3c6IHRoaXMuZ2V0T3B0aW9uKCdwcmV2QXJyb3cnKSxcbiAgICAgIHNob3J0aGFuZEN1cnJlbnRNb250aDogdGhpcy5nZXRPcHRpb24oJ3Nob3J0aGFuZEN1cnJlbnRNb250aCcpLFxuICAgICAgc3RhdGljOiB0aGlzLmdldE9wdGlvbignc3RhdGljJyksXG4gICAgICB0aW1lXzI0aHI6IHRoaXMuZ2V0T3B0aW9uKCd0aW1lXzI0aHInKSxcbiAgICAgIHV0YzogdGhpcy5nZXRPcHRpb24oJ3V0YycpLFxuICAgICAgd2Vla051bWJlcnM6IHRoaXMuZ2V0T3B0aW9uKCd3ZWVrTnVtYmVycycpLFxuICAgICAgd3JhcDogdGhpcy5nZXRPcHRpb24oJ3dyYXAnLCB0cnVlKSxcbiAgICB9O1xuXG4gICAgLy8gUmVtb3ZlIHVuc2V0IHByb3BlcnRpZXNcbiAgICBPYmplY3Qua2V5cyh0aGlzLmZsYXRwaWNrck9wdGlvbnMpLmZvckVhY2goKGtleTogc3RyaW5nKSA9PiB7XG4gICAgICBpZiAodGhpcy5mbGF0cGlja3JPcHRpb25zICYmIHRoaXMuZmxhdHBpY2tyT3B0aW9uc1trZXldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZGVsZXRlIHRoaXMuZmxhdHBpY2tyT3B0aW9uc1trZXldO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuY29udHJvbCkge1xuICAgICAgdGhpcy5mb3JtQ29udHJvbExpc3RlbmVyID0gdGhpcy5jb250cm9sLnZhbHVlQ2hhbmdlcy5zdWJzY3JpYmUoKHZhbHVlOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKCEodmFsdWUgaW5zdGFuY2VvZiBEYXRlKSkge1xuICAgICAgICAgIC8vIFF1aWV0bHkgdXBkYXRlIHRoZSB2YWx1ZSBvZiB0aGUgZm9ybSBjb250cm9sIHRvIGJlIGFcbiAgICAgICAgICAvLyBEYXRlIG9iamVjdC4gVGhpcyBhdm9pZHMgYW55IGV4dGVybmFsIHN1YnNjcmliZXJzXG4gICAgICAgICAgLy8gZnJvbSBiZWluZyBub3RpZmllZCBhIHNlY29uZCB0aW1lIChvbmNlIGZvciB0aGUgdXNlclxuICAgICAgICAgIC8vIGluaXRpYXRlZCBldmVudCwgYW5kIG9uY2UgZm9yIG91ciBjb252ZXJzaW9uIHRvXG4gICAgICAgICAgLy8gRGF0ZSgpKS5cbiAgICAgICAgICB0aGlzLmNvbnRyb2wuc2V0VmFsdWUobmV3IERhdGUoJycgKyB2YWx1ZSksIHtcbiAgICAgICAgICAgIG9ubHlTZWxmOiB0cnVlLFxuICAgICAgICAgICAgZW1pdEV2ZW50OiBmYWxzZSxcbiAgICAgICAgICAgIGVtaXRNb2RlbFRvVmlld0NoYW5nZTogZmFsc2UsXG4gICAgICAgICAgICBlbWl0Vmlld1RvTW9kZWxDaGFuZ2U6IGZhbHNlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRmlyZSBvZmYgdGhlIGV2ZW50IGVtaXR0ZXIgZm9yIHRoZSBkaXJlY3RpdmUgZWxlbWVudCwgYW5kIGFsc28gZm9yIHRoZVxuICAgKiBnbG9iYWwgb25DaGFuZ2UgY2FsbGJhY2ssIGlmIGRlZmluZWQuXG4gICAqL1xuICBwcm90ZWN0ZWQgZXZlbnRPbkNoYW5nZShzZWxlY3RlZERhdGVzOiBEYXRlW10sIGRhdGVTdHI6IHN0cmluZywgaW5zdGFuY2U6IE9iamVjdCk6IHZvaWQge1xuICAgIGxldCBldmVudDogRmxhdHBpY2tyRXZlbnQgPSB7XG4gICAgICBzZWxlY3RlZERhdGVzOiBzZWxlY3RlZERhdGVzLFxuICAgICAgZGF0ZVN0cjogZGF0ZVN0cixcbiAgICAgIGluc3RhbmNlOiBpbnN0YW5jZSxcbiAgICB9O1xuICAgIGlmICh0aGlzLmZsYXRwaWNrck9uQ2hhbmdlKSB7XG4gICAgICB0aGlzLmZsYXRwaWNrck9uQ2hhbmdlLmVtaXQoZXZlbnQpO1xuICAgIH1cbiAgICBpZiAodGhpcy5nbG9iYWxPbkNoYW5nZSkge1xuICAgICAgdGhpcy5nbG9iYWxPbkNoYW5nZShldmVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZpcmUgb2ZmIHRoZSBldmVudCBlbWl0dGVyIGZvciB0aGUgZGlyZWN0aXZlIGVsZW1lbnQsIGFuZCBhbHNvIGZvciB0aGVcbiAgICogZ2xvYmFsIG9uQ2xvc2UgY2FsbGJhY2ssIGlmIGRlZmluZWQuXG4gICAqL1xuICBwcm90ZWN0ZWQgZXZlbnRPbkNsb3NlKHNlbGVjdGVkRGF0ZXM6IERhdGVbXSwgZGF0ZVN0cjogc3RyaW5nLCBpbnN0YW5jZTogT2JqZWN0KTogdm9pZCB7XG4gICAgbGV0IGV2ZW50OiBGbGF0cGlja3JFdmVudCA9IHtcbiAgICAgIHNlbGVjdGVkRGF0ZXM6IHNlbGVjdGVkRGF0ZXMsXG4gICAgICBkYXRlU3RyOiBkYXRlU3RyLFxuICAgICAgaW5zdGFuY2U6IGluc3RhbmNlLFxuICAgIH07XG4gICAgaWYgKHRoaXMuZmxhdHBpY2tyT25DbG9zZSkge1xuICAgICAgdGhpcy5mbGF0cGlja3JPbkNsb3NlLmVtaXQoZXZlbnQpO1xuICAgIH1cbiAgICBpZiAodGhpcy5nbG9iYWxPbkNsb3NlKSB7XG4gICAgICB0aGlzLmdsb2JhbE9uQ2xvc2UoZXZlbnQpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGaXJlIG9mZiB0aGUgZXZlbnQgZW1pdHRlciBmb3IgdGhlIGRpcmVjdGl2ZSBlbGVtZW50LCBhbmQgYWxzbyBmb3IgdGhlXG4gICAqIGdsb2JhbCBvbk9wZW4gY2FsbGJhY2ssIGlmIGRlZmluZWQuXG4gICAqL1xuICBwcm90ZWN0ZWQgZXZlbnRPbk9wZW4oc2VsZWN0ZWREYXRlczogRGF0ZVtdLCBkYXRlU3RyOiBzdHJpbmcsIGluc3RhbmNlOiBPYmplY3QpOiB2b2lkIHtcbiAgICBsZXQgZXZlbnQ6IEZsYXRwaWNrckV2ZW50ID0ge1xuICAgICAgc2VsZWN0ZWREYXRlczogc2VsZWN0ZWREYXRlcyxcbiAgICAgIGRhdGVTdHI6IGRhdGVTdHIsXG4gICAgICBpbnN0YW5jZTogaW5zdGFuY2UsXG4gICAgfTtcbiAgICBpZiAodGhpcy5mbGF0cGlja3JPbk9wZW4pIHtcbiAgICAgIHRoaXMuZmxhdHBpY2tyT25PcGVuLmVtaXQoZXZlbnQpO1xuICAgIH1cbiAgICBpZiAodGhpcy5nbG9iYWxPbk9wZW4pIHtcbiAgICAgIHRoaXMuZ2xvYmFsT25PcGVuKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRmlyZSBvZmYgdGhlIGV2ZW50IGVtaXR0ZXIgZm9yIHRoZSBkaXJlY3RpdmUgZWxlbWVudCwgYW5kIGFsc28gZm9yIHRoZVxuICAgKiBnbG9iYWwgb25SZWFkeSBjYWxsYmFjaywgaWYgZGVmaW5lZC5cbiAgICovXG4gIHByb3RlY3RlZCBldmVudE9uUmVhZHkoc2VsZWN0ZWREYXRlczogRGF0ZVtdLCBkYXRlU3RyOiBzdHJpbmcsIGluc3RhbmNlOiBPYmplY3QpOiB2b2lkIHtcbiAgICBsZXQgZXZlbnQ6IEZsYXRwaWNrckV2ZW50ID0ge1xuICAgICAgc2VsZWN0ZWREYXRlczogc2VsZWN0ZWREYXRlcyxcbiAgICAgIGRhdGVTdHI6IGRhdGVTdHIsXG4gICAgICBpbnN0YW5jZTogaW5zdGFuY2UsXG4gICAgfTtcbiAgICBpZiAodGhpcy5mbGF0cGlja3JPblJlYWR5KSB7XG4gICAgICB0aGlzLmZsYXRwaWNrck9uUmVhZHkuZW1pdChldmVudCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmdsb2JhbE9uUmVhZHkpIHtcbiAgICAgIHRoaXMuZ2xvYmFsT25SZWFkeShldmVudCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybiB0aGUgY29uZmlndXJhdGlvbiB2YWx1ZSBmb3Igb3B0aW9uIHtvcHRpb259LCBvciB7ZGVmYXVsdFZhbHVlfSBpZiBpdFxuICAgKiBkb2Vzbid0IGV4aXN0LlxuICAgKi9cbiAgcHJvdGVjdGVkIGdldE9wdGlvbihvcHRpb246IHN0cmluZywgZGVmYXVsdFZhbHVlPzogYW55KTogYW55IHtcbiAgICBsZXQgbG9jYWxOYW1lID0gJ2ZsYXRwaWNrcicgKyBvcHRpb24uc3Vic3RyaW5nKDAsIDEpLnRvVXBwZXJDYXNlKCkgKyBvcHRpb24uc3Vic3RyaW5nKDEpO1xuXG4gICAgaWYgKHR5cGVvZiB0aGlzW2xvY2FsTmFtZV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm4gdGhpc1tsb2NhbE5hbWVdO1xuICAgIH0gZWxzZSBpZiAodGhpcy5mbGF0cGlja3JPcHRpb25zICYmIHR5cGVvZiB0aGlzLmZsYXRwaWNrck9wdGlvbnNbb3B0aW9uXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybiB0aGlzLmZsYXRwaWNrck9wdGlvbnNbb3B0aW9uXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==