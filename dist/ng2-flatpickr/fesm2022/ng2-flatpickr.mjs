import * as i0 from "@angular/core";
import {
  forwardRef,
  Component,
  ViewChild,
  Input,
  EventEmitter,
  Directive,
  Output,
  HostListener,
  NgModule,
} from "@angular/core";
import * as i1 from "@angular/forms";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import { CommonModule } from "@angular/common";
import "flatpickr";

// @ts-ignore
if (typeof window !== "undefined") {
  require("flatpickr");
}
class Ng2FlatpickrComponent {
  constructor() {
    this._tabindex = 0;
    this.onTouchedFn = () => {};
    this.defaultFlatpickrOptions = {
      wrap: true,
      clickOpens: true,
      onChange: (selectedDates) => {
        this.writeValue(selectedDates);
      },
    };
    this.placeholder = "";
    this.addClass = "";
    this.hideButton = false;
    this.propagateChange = (_) => {};
  }
  get tabindex() {
    return this._tabindex;
  }
  set tabindex(ti) {
    this._tabindex = Number(ti);
  }
  ///////////////////////////////////
  writeValue(value) {
    this.propagateChange(value);
  }
  registerOnChange(fn) {
    this.propagateChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouchedFn = fn;
  }
  ///////////////////////////////////
  setDateFromInput(date) {
    this.flatpickrElement.nativeElement._flatpickr.setDate(date, true);
  }
  setAltInputPlaceholder(placeholder) {
    this.flatpickrElement.nativeElement._flatpickr.altInput.setAttribute(
      "placeholder",
      placeholder,
    );
  }
  ngAfterViewInit() {
    if (this.config) {
      Object.assign(this.defaultFlatpickrOptions, this.config);
    }
    if (this.flatpickrElement.nativeElement.flatpickr) {
      this.flatpickr = this.flatpickrElement.nativeElement.flatpickr(
        this.defaultFlatpickrOptions,
      );
    }
    if (this.setDate) {
      this.setDateFromInput(this.setDate);
    }
  }
  ngOnChanges(changes) {
    if (
      this.flatpickrElement.nativeElement &&
      this.flatpickrElement.nativeElement._flatpickr
    ) {
      if (
        changes.hasOwnProperty("setDate") &&
        changes["setDate"].currentValue
      ) {
        this.setDateFromInput(changes["setDate"].currentValue);
      }
      if (
        this.config &&
        this.config.altInput &&
        changes.hasOwnProperty("placeholder") &&
        changes["placeholder"].currentValue
      ) {
        this.setAltInputPlaceholder(changes["placeholder"].currentValue);
      }
    }
  }
  onFocus(event) {
    this.onTouchedFn();
  }
  static {
    this.ɵfac = i0.ɵɵngDeclareFactory({
      minVersion: "12.0.0",
      version: "17.0.8",
      ngImport: i0,
      type: Ng2FlatpickrComponent,
      deps: [],
      target: i0.ɵɵFactoryTarget.Component,
    });
  }
  static {
    this.ɵcmp = i0.ɵɵngDeclareComponent({
      minVersion: "17.0.0",
      version: "17.0.8",
      type: Ng2FlatpickrComponent,
      selector: "ng2-flatpickr",
      inputs: {
        config: "config",
        placeholder: "placeholder",
        addClass: "addClass",
        setDate: "setDate",
        tabindex: "tabindex",
        hideButton: "hideButton",
      },
      providers: [
        {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => Ng2FlatpickrComponent),
          multi: true,
        },
      ],
      viewQueries: [
        {
          propertyName: "flatpickrElement",
          first: true,
          predicate: ["flatpickr"],
          descendants: true,
          static: true,
        },
      ],
      usesOnChanges: true,
      ngImport: i0,
      template: `
    <div class="ng2-flatpickr-input-container" #flatpickr>
      @if (!hideButton) {
        <input
          class="ng2-flatpickr-input {{ addClass }}"
          [placeholder]="placeholder"
          [tabindex]="tabindex"
          type="text"
          (focus)="onFocus($event)"
          data-input
        />
      }
      <ng-content></ng-content>
    </div>
  `,
      isInline: true,
    });
  }
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "17.0.8",
  ngImport: i0,
  type: Ng2FlatpickrComponent,
  decorators: [
    {
      type: Component,
      args: [
        {
          selector: "ng2-flatpickr",
          template: `
    <div class="ng2-flatpickr-input-container" #flatpickr>
      @if (!hideButton) {
        <input
          class="ng2-flatpickr-input {{ addClass }}"
          [placeholder]="placeholder"
          [tabindex]="tabindex"
          type="text"
          (focus)="onFocus($event)"
          data-input
        />
      }
      <ng-content></ng-content>
    </div>
  `,
          providers: [
            {
              provide: NG_VALUE_ACCESSOR,
              useExisting: forwardRef(() => Ng2FlatpickrComponent),
              multi: true,
            },
          ],
        },
      ],
    },
  ],
  propDecorators: {
    flatpickrElement: [
      {
        type: ViewChild,
        args: [
          "flatpickr",
          {
            static: true,
          },
        ],
      },
    ],
    config: [
      {
        type: Input,
      },
    ],
    placeholder: [
      {
        type: Input,
      },
    ],
    addClass: [
      {
        type: Input,
      },
    ],
    setDate: [
      {
        type: Input,
      },
    ],
    tabindex: [
      {
        type: Input,
      },
    ],
    hideButton: [
      {
        type: Input,
      },
    ],
  },
});

class Ng2FlatpickrDirective {
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
      throw new Error("Ng2FlatpickrDirective must be used within a form group");
    }
    const control = this.parent
      ? this.parent.formDirective.getControl(this.ngControl)
      : null;
    if (!control) {
      throw new Error("Control cannot be found in the form group");
    }
    return control;
  }
  ngAfterViewInit() {
    /** We cannot initialize the flatpickr instance in ngOnInit(); it will
         randomize the date when the form control initializes. */
    let nativeElement = this.element.nativeElement;
    if (typeof nativeElement === "undefined" || nativeElement === null) {
      throw "Error: invalid input element specified";
    }
    if (this.flatpickrOptions && this.flatpickrOptions.wrap) {
      this.renderer.setAttribute(this.element.nativeElement, "data-input", "");
      nativeElement = nativeElement.parentNode;
    }
    this.flatpickr = nativeElement.flatpickr(this.flatpickrOptions);
  }
  ngOnChanges(changes) {
    if (
      this.flatpickr &&
      this.flatpickrAltInput &&
      this.flatpickr.altInput &&
      changes.hasOwnProperty("placeholder") &&
      changes["placeholder"].currentValue
    ) {
      this.flatpickr.altInput.setAttribute(
        "placeholder",
        changes["placeholder"].currentValue,
      );
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
    this.globalOnChange = this.flatpickrOptions
      ? this.flatpickrOptions.onChange
      : undefined;
    this.globalOnClose = this.flatpickrOptions
      ? this.flatpickrOptions.onClose
      : undefined;
    this.globalOnOpen = this.flatpickrOptions
      ? this.flatpickrOptions.onOpen
      : undefined;
    this.globalOnReady = this.flatpickrOptions
      ? this.flatpickrOptions.onReady
      : undefined;
    this.flatpickrOptions = {
      altFormat: this.getOption("altFormat"),
      altInput: this.getOption("altInput"),
      altInputClass: this.getOption("altInputClass"),
      allowInput: this.getOption("allowInput"),
      appendTo: this.getOption("appendTo"),
      clickOpens: this.getOption("clickOpens", true),
      dateFormat: this.getOption("dateFormat"),
      defaultDate: this.getOption("defaultDate"),
      disable: this.getOption("disable"),
      disableMobile: this.getOption("disableMobile"),
      enable: this.getOption("enable"),
      enableTime: this.getOption("enableTime"),
      enableSeconds: this.getOption("enableSeconds"),
      hourIncrement: this.getOption("hourIncrement"),
      inline: this.getOption("inline"),
      locale: this.getOption("locale"),
      maxDate: this.getOption("maxDate"),
      minDate: this.getOption("minDate"),
      minuteIncrement: this.getOption("minuteIncrement"),
      mode: this.getOption("mode"),
      nextArrow: this.getOption("nextArrow"),
      noCalendar: this.getOption("noCalendar"),
      onChange: this.eventOnChange.bind(this),
      onClose: this.eventOnClose.bind(this),
      onOpen: this.eventOnOpen.bind(this),
      onReady: this.eventOnReady.bind(this),
      parseDate: this.getOption("parseDate"),
      prevArrow: this.getOption("prevArrow"),
      shorthandCurrentMonth: this.getOption("shorthandCurrentMonth"),
      static: this.getOption("static"),
      time_24hr: this.getOption("time_24hr"),
      utc: this.getOption("utc"),
      weekNumbers: this.getOption("weekNumbers"),
      wrap: this.getOption("wrap", true),
    };
    // Remove unset properties
    Object.keys(this.flatpickrOptions).forEach((key) => {
      if (this.flatpickrOptions && this.flatpickrOptions[key] === undefined) {
        delete this.flatpickrOptions[key];
      }
    });
    if (this.control) {
      this.formControlListener = this.control.valueChanges.subscribe(
        (value) => {
          if (!(value instanceof Date)) {
            // Quietly update the value of the form control to be a
            // Date object. This avoids any external subscribers
            // from being notified a second time (once for the user
            // initiated event, and once for our conversion to
            // Date()).
            this.control.setValue(new Date("" + value), {
              onlySelf: true,
              emitEvent: false,
              emitModelToViewChange: false,
              emitViewToModelChange: false,
            });
          }
        },
      );
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
    let localName =
      "flatpickr" + option.substring(0, 1).toUpperCase() + option.substring(1);
    if (typeof this[localName] !== "undefined") {
      return this[localName];
    } else if (
      this.flatpickrOptions &&
      typeof this.flatpickrOptions[option] !== "undefined"
    ) {
      return this.flatpickrOptions[option];
    } else {
      return defaultValue;
    }
  }
  static {
    this.ɵfac = i0.ɵɵngDeclareFactory({
      minVersion: "12.0.0",
      version: "17.0.8",
      ngImport: i0,
      type: Ng2FlatpickrDirective,
      deps: [
        { token: i1.ControlContainer },
        { token: i1.NgControl },
        { token: i0.ElementRef },
        { token: i0.Renderer2 },
      ],
      target: i0.ɵɵFactoryTarget.Directive,
    });
  }
  static {
    this.ɵdir = i0.ɵɵngDeclareDirective({
      minVersion: "14.0.0",
      version: "17.0.8",
      type: Ng2FlatpickrDirective,
      selector: "[flatpickr]",
      inputs: {
        flatpickrOptions: ["flatpickr", "flatpickrOptions"],
        placeholder: "placeholder",
        flatpickrAltFormat: ["altFormat", "flatpickrAltFormat"],
        flatpickrAltInput: ["altInput", "flatpickrAltInput"],
        flatpickrAltInputClass: ["altInputClass", "flatpickrAltInputClass"],
        flatpickrAllowInput: ["allowInput", "flatpickrAllowInput"],
        flatpickrAppendTo: ["appendTo", "flatpickrAppendTo"],
        flatpickrClickOpens: ["clickOpens", "flatpickrClickOpens"],
        flatpickrDateFormat: ["dateFormat", "flatpickrDateFormat"],
        flatpickrDefaultDate: ["defaultDate", "flatpickrDefaultDate"],
        flatpickrDisable: ["disable", "flatpickrDisable"],
        flatpickrDisableMobile: ["disableMobile", "flatpickrDisableMobile"],
        flatpickrEnable: ["enable", "flatpickrEnable"],
        flatpickrEnableTime: ["enableTime", "flatpickrEnableTime"],
        flatpickrEnableSeconds: ["enableSeconds", "flatpickrEnableSeconds"],
        flatpickrHourIncrement: ["hourIncrement", "flatpickrHourIncrement"],
        flatpickrInline: ["inline", "flatpickrInline"],
        flatpickrLocale: ["locale", "flatpickrLocale"],
        flatpickrMaxDate: ["maxDate", "flatpickrMaxDate"],
        flatpickrMinDate: ["minDate", "flatpickrMinDate"],
        flatpickrMinuteIncrement: [
          "minuteIncrement",
          "flatpickrMinuteIncrement",
        ],
        flatpickrMode: ["mode", "flatpickrMode"],
        flatpickrNextArrow: ["nextArrow", "flatpickrNextArrow"],
        flatpickrNoCalendar: ["noCalendar", "flatpickrNoCalendar"],
        flatpickrParseDate: ["parseDate", "flatpickrParseDate"],
        flatpickrPrevArrow: ["prevArrow", "flatpickrPrevArrow"],
        flatpickrShorthandCurrentMonth: [
          "shorthandCurrentMonth",
          "flatpickrShorthandCurrentMonth",
        ],
        flatpickrStatic: ["static", "flatpickrStatic"],
        flatpickrTime_24hr: ["time_24hr", "flatpickrTime_24hr"],
        flatpickrUtc: ["utc", "flatpickrUtc"],
        flatpickrWeekNumbers: ["weekNumbers", "flatpickrWeekNumbers"],
        flatpickrWrap: ["wrap", "flatpickrWrap"],
      },
      outputs: {
        flatpickrOnChange: "onChange",
        flatpickrOnClose: "onClose",
        flatpickrOnOpen: "onOpen",
        flatpickrOnReady: "onReady",
      },
      host: { listeners: { dblclick: "onClick()" } },
      exportAs: ["ng2-flatpickr"],
      usesOnChanges: true,
      ngImport: i0,
    });
  }
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "17.0.8",
  ngImport: i0,
  type: Ng2FlatpickrDirective,
  decorators: [
    {
      type: Directive,
      args: [
        {
          selector: "[flatpickr]",
          exportAs: "ng2-flatpickr",
        },
      ],
    },
  ],
  ctorParameters: () => [
    { type: i1.ControlContainer },
    { type: i1.NgControl },
    { type: i0.ElementRef },
    { type: i0.Renderer2 },
  ],
  propDecorators: {
    flatpickrOptions: [
      {
        type: Input,
        args: ["flatpickr"],
      },
    ],
    placeholder: [
      {
        type: Input,
        args: ["placeholder"],
      },
    ],
    flatpickrAltFormat: [
      {
        type: Input,
        args: ["altFormat"],
      },
    ],
    flatpickrAltInput: [
      {
        type: Input,
        args: ["altInput"],
      },
    ],
    flatpickrAltInputClass: [
      {
        type: Input,
        args: ["altInputClass"],
      },
    ],
    flatpickrAllowInput: [
      {
        type: Input,
        args: ["allowInput"],
      },
    ],
    flatpickrAppendTo: [
      {
        type: Input,
        args: ["appendTo"],
      },
    ],
    flatpickrClickOpens: [
      {
        type: Input,
        args: ["clickOpens"],
      },
    ],
    flatpickrDateFormat: [
      {
        type: Input,
        args: ["dateFormat"],
      },
    ],
    flatpickrDefaultDate: [
      {
        type: Input,
        args: ["defaultDate"],
      },
    ],
    flatpickrDisable: [
      {
        type: Input,
        args: ["disable"],
      },
    ],
    flatpickrDisableMobile: [
      {
        type: Input,
        args: ["disableMobile"],
      },
    ],
    flatpickrEnable: [
      {
        type: Input,
        args: ["enable"],
      },
    ],
    flatpickrEnableTime: [
      {
        type: Input,
        args: ["enableTime"],
      },
    ],
    flatpickrEnableSeconds: [
      {
        type: Input,
        args: ["enableSeconds"],
      },
    ],
    flatpickrHourIncrement: [
      {
        type: Input,
        args: ["hourIncrement"],
      },
    ],
    flatpickrInline: [
      {
        type: Input,
        args: ["inline"],
      },
    ],
    flatpickrLocale: [
      {
        type: Input,
        args: ["locale"],
      },
    ],
    flatpickrMaxDate: [
      {
        type: Input,
        args: ["maxDate"],
      },
    ],
    flatpickrMinDate: [
      {
        type: Input,
        args: ["minDate"],
      },
    ],
    flatpickrMinuteIncrement: [
      {
        type: Input,
        args: ["minuteIncrement"],
      },
    ],
    flatpickrMode: [
      {
        type: Input,
        args: ["mode"],
      },
    ],
    flatpickrNextArrow: [
      {
        type: Input,
        args: ["nextArrow"],
      },
    ],
    flatpickrNoCalendar: [
      {
        type: Input,
        args: ["noCalendar"],
      },
    ],
    flatpickrParseDate: [
      {
        type: Input,
        args: ["parseDate"],
      },
    ],
    flatpickrPrevArrow: [
      {
        type: Input,
        args: ["prevArrow"],
      },
    ],
    flatpickrShorthandCurrentMonth: [
      {
        type: Input,
        args: ["shorthandCurrentMonth"],
      },
    ],
    flatpickrStatic: [
      {
        type: Input,
        args: ["static"],
      },
    ],
    flatpickrTime_24hr: [
      {
        type: Input,
        args: ["time_24hr"],
      },
    ],
    flatpickrUtc: [
      {
        type: Input,
        args: ["utc"],
      },
    ],
    flatpickrWeekNumbers: [
      {
        type: Input,
        args: ["weekNumbers"],
      },
    ],
    flatpickrWrap: [
      {
        type: Input,
        args: ["wrap"],
      },
    ],
    flatpickrOnChange: [
      {
        type: Output,
        args: ["onChange"],
      },
    ],
    flatpickrOnClose: [
      {
        type: Output,
        args: ["onClose"],
      },
    ],
    flatpickrOnOpen: [
      {
        type: Output,
        args: ["onOpen"],
      },
    ],
    flatpickrOnReady: [
      {
        type: Output,
        args: ["onReady"],
      },
    ],
    onClick: [
      {
        type: HostListener,
        args: ["dblclick"],
      },
    ],
  },
});

class Ng2FlatpickrModule {
  static {
    this.ɵfac = i0.ɵɵngDeclareFactory({
      minVersion: "12.0.0",
      version: "17.0.8",
      ngImport: i0,
      type: Ng2FlatpickrModule,
      deps: [],
      target: i0.ɵɵFactoryTarget.NgModule,
    });
  }
  static {
    this.ɵmod = i0.ɵɵngDeclareNgModule({
      minVersion: "14.0.0",
      version: "17.0.8",
      ngImport: i0,
      type: Ng2FlatpickrModule,
      declarations: [Ng2FlatpickrComponent, Ng2FlatpickrDirective],
      imports: [CommonModule],
      exports: [Ng2FlatpickrComponent, Ng2FlatpickrDirective],
    });
  }
  static {
    this.ɵinj = i0.ɵɵngDeclareInjector({
      minVersion: "12.0.0",
      version: "17.0.8",
      ngImport: i0,
      type: Ng2FlatpickrModule,
      imports: [CommonModule],
    });
  }
}
i0.ɵɵngDeclareClassMetadata({
  minVersion: "12.0.0",
  version: "17.0.8",
  ngImport: i0,
  type: Ng2FlatpickrModule,
  decorators: [
    {
      type: NgModule,
      args: [
        {
          imports: [CommonModule],
          declarations: [Ng2FlatpickrComponent, Ng2FlatpickrDirective],
          exports: [Ng2FlatpickrComponent, Ng2FlatpickrDirective],
        },
      ],
    },
  ],
});

/**
 * Generated bundle index. Do not edit.
 */

export { Ng2FlatpickrComponent, Ng2FlatpickrDirective, Ng2FlatpickrModule };
//# sourceMappingURL=ng2-flatpickr.mjs.map
