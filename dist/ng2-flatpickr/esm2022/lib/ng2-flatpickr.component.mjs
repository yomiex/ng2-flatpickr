import { Component, forwardRef, Input, ViewChild } from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";
import * as i0 from "@angular/core";
// @ts-ignore
if (typeof window !== "undefined") {
  require("flatpickr");
}
export class Ng2FlatpickrComponent {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWZsYXRwaWNrci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZzItZmxhdHBpY2tyL3NyYy9saWIvbmcyLWZsYXRwaWNrci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUVMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxFQUdMLFNBQVMsR0FDVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXdCLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBS3pFLGFBQWE7QUFDYixJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRTtJQUNqQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7Q0FDdEI7QUEyQkQsTUFBTSxPQUFPLHFCQUFxQjtJQXpCbEM7UUEyQlUsY0FBUyxHQUFHLENBQUMsQ0FBQztRQUN0QixnQkFBVyxHQUFhLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUV6Qiw0QkFBdUIsR0FBcUI7WUFDbEQsSUFBSSxFQUFFLElBQUk7WUFDVixVQUFVLEVBQUUsSUFBSTtZQUNoQixRQUFRLEVBQUUsQ0FBQyxhQUFrQixFQUFFLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDakMsQ0FBQztTQUNGLENBQUM7UUFXRixnQkFBVyxHQUFXLEVBQUUsQ0FBQztRQUd6QixhQUFRLEdBQVcsRUFBRSxDQUFDO1FBZXRCLGVBQVUsR0FBRyxLQUFLLENBQUM7UUFnQm5CLG9CQUFlLEdBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFFLENBQUMsQ0FBQztLQStDbEM7SUF6RUMsSUFDSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxJQUFJLFFBQVEsQ0FBQyxFQUFVO1FBQ3JCLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFD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O2lCQUNGOzhCQWlCQyxnQkFBZ0I7c0JBSGYsU0FBUzt1QkFBQyxXQUFXLEVBQUU7d0JBQ3RCLE1BQU0sRUFBRSxJQUFJO3FCQUNiO2dCQUlELE1BQU07c0JBREwsS0FBSztnQkFJTixXQUFXO3NCQURWLEtBQUs7Z0JBSU4sUUFBUTtzQkFEUCxLQUFLO2dCQUlOLE9BQU87c0JBRE4sS0FBSztnQkFJRixRQUFRO3NCQURYLEtBQUs7Z0JBVU4sVUFBVTtzQkFEVCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRmxhdHBpY2tyT3B0aW9ucyB9IGZyb20gJy4vZmxhdHBpY2tyLW9wdGlvbnMuaW50ZXJmYWNlJztcblxuZGVjbGFyZSB2YXIgcmVxdWlyZTogYW55O1xuXG4vLyBAdHMtaWdub3JlXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcmVxdWlyZSgnZmxhdHBpY2tyJyk7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nMi1mbGF0cGlja3InLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJuZzItZmxhdHBpY2tyLWlucHV0LWNvbnRhaW5lclwiICNmbGF0cGlja3I+XG4gICAgICBAaWYgKCFoaWRlQnV0dG9uKSB7XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIGNsYXNzPVwibmcyLWZsYXRwaWNrci1pbnB1dCB7eyBhZGRDbGFzcyB9fVwiXG4gICAgICAgICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICAgICAgICBbdGFiaW5kZXhdPVwidGFiaW5kZXhcIlxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAoZm9jdXMpPVwib25Gb2N1cygkZXZlbnQpXCJcbiAgICAgICAgICBkYXRhLWlucHV0XG4gICAgICAgIC8+XG4gICAgICB9XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmcyRmxhdHBpY2tyQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5nMkZsYXRwaWNrckNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkNoYW5nZXMge1xuICBwdWJsaWMgZmxhdHBpY2tyOiBPYmplY3QgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgX3RhYmluZGV4ID0gMDtcbiAgb25Ub3VjaGVkRm46IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgcHJpdmF0ZSBkZWZhdWx0RmxhdHBpY2tyT3B0aW9uczogRmxhdHBpY2tyT3B0aW9ucyA9IHtcbiAgICB3cmFwOiB0cnVlLFxuICAgIGNsaWNrT3BlbnM6IHRydWUsXG4gICAgb25DaGFuZ2U6IChzZWxlY3RlZERhdGVzOiBhbnkpID0+IHtcbiAgICAgIHRoaXMud3JpdGVWYWx1ZShzZWxlY3RlZERhdGVzKTtcbiAgICB9LFxuICB9O1xuXG4gIEBWaWV3Q2hpbGQoJ2ZsYXRwaWNrcicsIHtcbiAgICBzdGF0aWM6IHRydWUsXG4gIH0pXG4gIGZsYXRwaWNrckVsZW1lbnQ6IGFueTtcblxuICBASW5wdXQoKVxuICBjb25maWc6IEZsYXRwaWNrck9wdGlvbnMgfCB1bmRlZmluZWQ7XG5cbiAgQElucHV0KClcbiAgcGxhY2Vob2xkZXI6IHN0cmluZyA9ICcnO1xuXG4gIEBJbnB1dCgpXG4gIGFkZENsYXNzOiBzdHJpbmcgPSAnJztcblxuICBASW5wdXQoKVxuICBzZXREYXRlOiBzdHJpbmcgfCBEYXRlIHwgdW5kZWZpbmVkO1xuXG4gIEBJbnB1dCgpXG4gIGdldCB0YWJpbmRleCgpIHtcbiAgICByZXR1cm4gdGhpcy5fdGFiaW5kZXg7XG4gIH1cblxuICBzZXQgdGFiaW5kZXgodGk6IG51bWJlcikge1xuICAgIHRoaXMuX3RhYmluZGV4ID0gTnVtYmVyKHRpKTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIGhpZGVCdXR0b24gPSBmYWxzZTtcblxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKHZhbHVlKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWRGbiA9IGZuO1xuICB9XG5cbiAgcHJvcGFnYXRlQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG5cbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICBzZXREYXRlRnJvbUlucHV0KGRhdGU6IGFueSkge1xuICAgIHRoaXMuZmxhdHBpY2tyRWxlbWVudC5uYXRpdmVFbGVtZW50Ll9mbGF0cGlja3Iuc2V0RGF0ZShkYXRlLCB0cnVlKTtcbiAgfVxuXG4gIHNldEFsdElucHV0UGxhY2Vob2xkZXIocGxhY2Vob2xkZXI6IHN0cmluZykge1xuICAgIHRoaXMuZmxhdHBpY2tyRWxlbWVudC5uYXRpdmVFbGVtZW50Ll9mbGF0cGlja3IuYWx0SW5wdXQuc2V0QXR0cmlidXRlKFxuICAgICAgJ3BsYWNlaG9sZGVyJyxcbiAgICAgIHBsYWNlaG9sZGVyLFxuICAgICk7XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgaWYgKHRoaXMuY29uZmlnKSB7XG4gICAgICBPYmplY3QuYXNzaWduKHRoaXMuZGVmYXVsdEZsYXRwaWNrck9wdGlvbnMsIHRoaXMuY29uZmlnKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZmxhdHBpY2tyRWxlbWVudC5uYXRpdmVFbGVtZW50LmZsYXRwaWNrcikge1xuICAgICAgdGhpcy5mbGF0cGlja3IgPSB0aGlzLmZsYXRwaWNrckVsZW1lbnQubmF0aXZlRWxlbWVudC5mbGF0cGlja3IodGhpcy5kZWZhdWx0RmxhdHBpY2tyT3B0aW9ucyk7XG4gICAgfVxuICAgIGlmICh0aGlzLnNldERhdGUpIHtcbiAgICAgIHRoaXMuc2V0RGF0ZUZyb21JbnB1dCh0aGlzLnNldERhdGUpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAodGhpcy5mbGF0cGlja3JFbGVtZW50Lm5hdGl2ZUVsZW1lbnQgJiYgdGhpcy5mbGF0cGlja3JFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuX2ZsYXRwaWNrcikge1xuICAgICAgaWYgKGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ3NldERhdGUnKSAmJiBjaGFuZ2VzWydzZXREYXRlJ10uY3VycmVudFZhbHVlKSB7XG4gICAgICAgIHRoaXMuc2V0RGF0ZUZyb21JbnB1dChjaGFuZ2VzWydzZXREYXRlJ10uY3VycmVudFZhbHVlKTtcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICB0aGlzLmNvbmZpZyAmJlxuICAgICAgICB0aGlzLmNvbmZpZy5hbHRJbnB1dCAmJlxuICAgICAgICBjaGFuZ2VzLmhhc093blByb3BlcnR5KCdwbGFjZWhvbGRlcicpICYmXG4gICAgICAgIGNoYW5nZXNbJ3BsYWNlaG9sZGVyJ10uY3VycmVudFZhbHVlXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5zZXRBbHRJbnB1dFBsYWNlaG9sZGVyKGNoYW5nZXNbJ3BsYWNlaG9sZGVyJ10uY3VycmVudFZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvbkZvY3VzKGV2ZW50OiBhbnkpIHtcbiAgICB0aGlzLm9uVG91Y2hlZEZuKCk7XG4gIH1cbn1cbiJdfQ==
