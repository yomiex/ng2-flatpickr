import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import * as i0 from "@angular/core";
// @ts-ignore
if (typeof window !== 'undefined') {
    require('flatpickr');
}
export class Ng2FlatpickrComponent {
    constructor() {
        this._tabindex = 0;
        this.onTouchedFn = () => { };
        this.defaultFlatpickrOptions = {
            wrap: true,
            clickOpens: true,
            onChange: (selectedDates) => {
                this.writeValue(selectedDates);
            },
        };
        this.placeholder = '';
        this.addClass = '';
        this.hideButton = false;
        this.propagateChange = (_) => { };
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
        this.flatpickrElement.nativeElement._flatpickr.altInput.setAttribute('placeholder', placeholder);
    }
    ngAfterViewInit() {
        if (this.config) {
            Object.assign(this.defaultFlatpickrOptions, this.config);
        }
        if (this.flatpickrElement.nativeElement.flatpickr) {
            this.flatpickr = this.flatpickrElement.nativeElement.flatpickr(this.defaultFlatpickrOptions);
        }
        if (this.setDate) {
            this.setDateFromInput(this.setDate);
        }
    }
    ngOnChanges(changes) {
        if (this.flatpickrElement.nativeElement && this.flatpickrElement.nativeElement._flatpickr) {
            if (changes.hasOwnProperty('setDate') && changes['setDate'].currentValue) {
                this.setDateFromInput(changes['setDate'].currentValue);
            }
            if (this.config &&
                this.config.altInput &&
                changes.hasOwnProperty('placeholder') &&
                changes['placeholder'].currentValue) {
                this.setAltInputPlaceholder(changes['placeholder'].currentValue);
            }
        }
    }
    onFocus(event) {
        this.onTouchedFn();
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.0.8", ngImport: i0, type: Ng2FlatpickrComponent, deps: [], target: i0.ɵɵFactoryTarget.Component }); }
    static { this.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "17.0.0", version: "17.0.8", type: Ng2FlatpickrComponent, selector: "ng2-flatpickr", inputs: { config: "config", placeholder: "placeholder", addClass: "addClass", setDate: "setDate", tabindex: "tabindex", hideButton: "hideButton" }, providers: [
            {
                provide: NG_VALUE_ACCESSOR,
                useExisting: forwardRef(() => Ng2FlatpickrComponent),
                multi: true,
            },
        ], viewQueries: [{ propertyName: "flatpickrElement", first: true, predicate: ["flatpickr"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: `
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
  `, isInline: true }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.0.8", ngImport: i0, type: Ng2FlatpickrComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'ng2-flatpickr',
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
                }]
        }], propDecorators: { flatpickrElement: [{
                type: ViewChild,
                args: ['flatpickr', {
                        static: true,
                    }]
            }], config: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], addClass: [{
                type: Input
            }], setDate: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], hideButton: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWZsYXRwaWNrci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZzItZmxhdHBpY2tyL3NyYy9saWIvbmcyLWZsYXRwaWNrci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQixTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBNEIsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pILE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFLekUsYUFBYTtBQUNiLElBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFFO0lBQ2pDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztDQUN0QjtBQTJCRCxNQUFNLE9BQU8scUJBQXFCO0lBekJsQztRQTJCVSxjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLGdCQUFXLEdBQWEsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBRXpCLDRCQUF1QixHQUFxQjtZQUNsRCxJQUFJLEVBQUUsSUFBSTtZQUNWLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLFFBQVEsRUFBRSxDQUFDLGFBQWtCLEVBQUUsRUFBRTtnQkFDL0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNqQyxDQUFDO1NBQ0YsQ0FBQztRQVdGLGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBR3pCLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFldEIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQWdCbkIsb0JBQWUsR0FBRyxDQUFDLENBQU0sRUFBRSxFQUFFLEdBQUUsQ0FBQyxDQUFDO0tBNENsQztJQXRFQyxJQUNJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQUksUUFBUSxDQUFDLEVBQVU7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLENB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Q0Y7aUJBQ0Y7OEJBaUJDLGdCQUFnQjtzQkFIZixTQUFTO3VCQUFDLFdBQVcsRUFBRTt3QkFDdEIsTUFBTSxFQUFFLElBQUk7cUJBQ2I7Z0JBSUQsTUFBTTtzQkFETCxLQUFLO2dCQUlOLFdBQVc7c0JBRFYsS0FBSztnQkFJTixRQUFRO3NCQURQLEtBQUs7Z0JBSU4sT0FBTztzQkFETixLQUFLO2dCQUlGLFFBQVE7c0JBRFgsS0FBSztnQkFVTixVQUFVO3NCQURULEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIGZvcndhcmRSZWYsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IEZsYXRwaWNrck9wdGlvbnMgfSBmcm9tICcuL2ZsYXRwaWNrci1vcHRpb25zLmludGVyZmFjZSc7XHJcblxyXG5kZWNsYXJlIHZhciByZXF1aXJlOiBhbnk7XHJcblxyXG4vLyBAdHMtaWdub3JlXHJcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xyXG4gIHJlcXVpcmUoJ2ZsYXRwaWNrcicpO1xyXG59XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ25nMi1mbGF0cGlja3InLFxyXG4gIHRlbXBsYXRlOiBgXHJcbiAgICA8ZGl2IGNsYXNzPVwibmcyLWZsYXRwaWNrci1pbnB1dC1jb250YWluZXJcIiAjZmxhdHBpY2tyPlxyXG4gICAgICBAaWYgKCFoaWRlQnV0dG9uKSB7XHJcbiAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICBjbGFzcz1cIm5nMi1mbGF0cGlja3ItaW5wdXQge3sgYWRkQ2xhc3MgfX1cIlxyXG4gICAgICAgICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcclxuICAgICAgICAgIFt0YWJpbmRleF09XCJ0YWJpbmRleFwiXHJcbiAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAoZm9jdXMpPVwib25Gb2N1cygkZXZlbnQpXCJcclxuICAgICAgICAgIGRhdGEtaW5wdXRcclxuICAgICAgICAvPlxyXG4gICAgICB9XHJcbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuICAgIDwvZGl2PlxyXG4gIGAsXHJcbiAgcHJvdmlkZXJzOiBbXHJcbiAgICB7XHJcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBOZzJGbGF0cGlja3JDb21wb25lbnQpLFxyXG4gICAgICBtdWx0aTogdHJ1ZSxcclxuICAgIH0sXHJcbiAgXSxcclxufSlcclxuZXhwb3J0IGNsYXNzIE5nMkZsYXRwaWNrckNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkNoYW5nZXMge1xyXG4gIHB1YmxpYyBmbGF0cGlja3I6IE9iamVjdCB8IHVuZGVmaW5lZDtcclxuICBwcml2YXRlIF90YWJpbmRleCA9IDA7XHJcbiAgb25Ub3VjaGVkRm46IEZ1bmN0aW9uID0gKCkgPT4ge307XHJcblxyXG4gIHByaXZhdGUgZGVmYXVsdEZsYXRwaWNrck9wdGlvbnM6IEZsYXRwaWNrck9wdGlvbnMgPSB7XHJcbiAgICB3cmFwOiB0cnVlLFxyXG4gICAgY2xpY2tPcGVuczogdHJ1ZSxcclxuICAgIG9uQ2hhbmdlOiAoc2VsZWN0ZWREYXRlczogYW55KSA9PiB7XHJcbiAgICAgIHRoaXMud3JpdGVWYWx1ZShzZWxlY3RlZERhdGVzKTtcclxuICAgIH0sXHJcbiAgfTtcclxuXHJcbiAgQFZpZXdDaGlsZCgnZmxhdHBpY2tyJywge1xyXG4gICAgc3RhdGljOiB0cnVlLFxyXG4gIH0pXHJcbiAgZmxhdHBpY2tyRWxlbWVudDogYW55O1xyXG5cclxuICBASW5wdXQoKVxyXG4gIGNvbmZpZzogRmxhdHBpY2tyT3B0aW9ucyB8IHVuZGVmaW5lZDtcclxuXHJcbiAgQElucHV0KClcclxuICBwbGFjZWhvbGRlcjogc3RyaW5nID0gJyc7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgYWRkQ2xhc3M6IHN0cmluZyA9ICcnO1xyXG5cclxuICBASW5wdXQoKVxyXG4gIHNldERhdGU6IHN0cmluZyB8IERhdGUgfCB1bmRlZmluZWQ7XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgZ2V0IHRhYmluZGV4KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuX3RhYmluZGV4O1xyXG4gIH1cclxuXHJcbiAgc2V0IHRhYmluZGV4KHRpOiBudW1iZXIpIHtcclxuICAgIHRoaXMuX3RhYmluZGV4ID0gTnVtYmVyKHRpKTtcclxuICB9XHJcblxyXG4gIEBJbnB1dCgpXHJcbiAgaGlkZUJ1dHRvbiA9IGZhbHNlO1xyXG5cclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcclxuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKHZhbHVlKTtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xyXG4gICAgdGhpcy5wcm9wYWdhdGVDaGFuZ2UgPSBmbjtcclxuICB9XHJcblxyXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgIHRoaXMub25Ub3VjaGVkRm4gPSBmbjtcclxuICB9XHJcblxyXG4gIHByb3BhZ2F0ZUNoYW5nZSA9IChfOiBhbnkpID0+IHt9O1xyXG5cclxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xyXG5cclxuICBzZXREYXRlRnJvbUlucHV0KGRhdGU6IGFueSkge1xyXG4gICAgdGhpcy5mbGF0cGlja3JFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuX2ZsYXRwaWNrci5zZXREYXRlKGRhdGUsIHRydWUpO1xyXG4gIH1cclxuXHJcbiAgc2V0QWx0SW5wdXRQbGFjZWhvbGRlcihwbGFjZWhvbGRlcjogc3RyaW5nKSB7XHJcbiAgICB0aGlzLmZsYXRwaWNrckVsZW1lbnQubmF0aXZlRWxlbWVudC5fZmxhdHBpY2tyLmFsdElucHV0LnNldEF0dHJpYnV0ZSgncGxhY2Vob2xkZXInLCBwbGFjZWhvbGRlcik7XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICBpZiAodGhpcy5jb25maWcpIHtcclxuICAgICAgT2JqZWN0LmFzc2lnbih0aGlzLmRlZmF1bHRGbGF0cGlja3JPcHRpb25zLCB0aGlzLmNvbmZpZyk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5mbGF0cGlja3JFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZmxhdHBpY2tyKSB7XHJcbiAgICAgIHRoaXMuZmxhdHBpY2tyID0gdGhpcy5mbGF0cGlja3JFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZmxhdHBpY2tyKHRoaXMuZGVmYXVsdEZsYXRwaWNrck9wdGlvbnMpO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMuc2V0RGF0ZSkge1xyXG4gICAgICB0aGlzLnNldERhdGVGcm9tSW5wdXQodGhpcy5zZXREYXRlKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgIGlmICh0aGlzLmZsYXRwaWNrckVsZW1lbnQubmF0aXZlRWxlbWVudCAmJiB0aGlzLmZsYXRwaWNrckVsZW1lbnQubmF0aXZlRWxlbWVudC5fZmxhdHBpY2tyKSB7XHJcbiAgICAgIGlmIChjaGFuZ2VzLmhhc093blByb3BlcnR5KCdzZXREYXRlJykgJiYgY2hhbmdlc1snc2V0RGF0ZSddLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICAgIHRoaXMuc2V0RGF0ZUZyb21JbnB1dChjaGFuZ2VzWydzZXREYXRlJ10uY3VycmVudFZhbHVlKTtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKFxyXG4gICAgICAgIHRoaXMuY29uZmlnICYmXHJcbiAgICAgICAgdGhpcy5jb25maWcuYWx0SW5wdXQgJiZcclxuICAgICAgICBjaGFuZ2VzLmhhc093blByb3BlcnR5KCdwbGFjZWhvbGRlcicpICYmXHJcbiAgICAgICAgY2hhbmdlc1sncGxhY2Vob2xkZXInXS5jdXJyZW50VmFsdWVcclxuICAgICAgKSB7XHJcbiAgICAgICAgdGhpcy5zZXRBbHRJbnB1dFBsYWNlaG9sZGVyKGNoYW5nZXNbJ3BsYWNlaG9sZGVyJ10uY3VycmVudFZhbHVlKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgb25Gb2N1cyhldmVudDogYW55KSB7XHJcbiAgICB0aGlzLm9uVG91Y2hlZEZuKCk7XHJcbiAgfVxyXG59XHJcbiJdfQ==