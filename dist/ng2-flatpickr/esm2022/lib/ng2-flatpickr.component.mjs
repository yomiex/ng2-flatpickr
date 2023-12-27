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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmcyLWZsYXRwaWNrci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9uZzItZmxhdHBpY2tyL3NyYy9saWIvbmcyLWZsYXRwaWNrci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQixTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBNEIsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pILE9BQU8sRUFBd0IsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFLekUsYUFBYTtBQUNiLElBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFFO0lBQ2pDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztDQUN0QjtBQTJCRCxNQUFNLE9BQU8scUJBQXFCO0lBekJsQztRQTJCVSxjQUFTLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLGdCQUFXLEdBQWEsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBRXpCLDRCQUF1QixHQUFxQjtZQUNsRCxJQUFJLEVBQUUsSUFBSTtZQUNWLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLFFBQVEsRUFBRSxDQUFDLGFBQWtCLEVBQUUsRUFBRTtnQkFDL0IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUNqQyxDQUFDO1NBQ0YsQ0FBQztRQVdGLGdCQUFXLEdBQVcsRUFBRSxDQUFDO1FBR3pCLGFBQVEsR0FBVyxFQUFFLENBQUM7UUFldEIsZUFBVSxHQUFHLEtBQUssQ0FBQztRQWdCbkIsb0JBQWUsR0FBRyxDQUFDLENBQU0sRUFBRSxFQUFFLEdBQUUsQ0FBQyxDQUFDO0tBNENsQztJQXRFQyxJQUNJLFFBQVE7UUFDVixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7SUFDeEIsQ0FBQztJQUVELElBQUksUUFBUSxDQUFDLEVBQVU7UUFDckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUMsRUFBRSxDQUFDLENB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Q0Y7aUJBQ0Y7OEJBaUJDLGdCQUFnQjtzQkFIZixTQUFTO3VCQUFDLFdBQVcsRUFBRTt3QkFDdEIsTUFBTSxFQUFFLElBQUk7cUJBQ2I7Z0JBSUQsTUFBTTtzQkFETCxLQUFLO2dCQUlOLFdBQVc7c0JBRFYsS0FBSztnQkFJTixRQUFRO3NCQURQLEtBQUs7Z0JBSU4sT0FBTztzQkFETixLQUFLO2dCQUlGLFFBQVE7c0JBRFgsS0FBSztnQkFVTixVQUFVO3NCQURULEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDb21wb25lbnQsIGZvcndhcmRSZWYsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgRmxhdHBpY2tyT3B0aW9ucyB9IGZyb20gJy4vZmxhdHBpY2tyLW9wdGlvbnMuaW50ZXJmYWNlJztcblxuZGVjbGFyZSB2YXIgcmVxdWlyZTogYW55O1xuXG4vLyBAdHMtaWdub3JlXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcmVxdWlyZSgnZmxhdHBpY2tyJyk7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25nMi1mbGF0cGlja3InLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgY2xhc3M9XCJuZzItZmxhdHBpY2tyLWlucHV0LWNvbnRhaW5lclwiICNmbGF0cGlja3I+XG4gICAgICBAaWYgKCFoaWRlQnV0dG9uKSB7XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIGNsYXNzPVwibmcyLWZsYXRwaWNrci1pbnB1dCB7eyBhZGRDbGFzcyB9fVwiXG4gICAgICAgICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICAgICAgICBbdGFiaW5kZXhdPVwidGFiaW5kZXhcIlxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAoZm9jdXMpPVwib25Gb2N1cygkZXZlbnQpXCJcbiAgICAgICAgICBkYXRhLWlucHV0XG4gICAgICAgIC8+XG4gICAgICB9XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gTmcyRmxhdHBpY2tyQ29tcG9uZW50KSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE5nMkZsYXRwaWNrckNvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkNoYW5nZXMge1xuICBwdWJsaWMgZmxhdHBpY2tyOiBPYmplY3QgfCB1bmRlZmluZWQ7XG4gIHByaXZhdGUgX3RhYmluZGV4ID0gMDtcbiAgb25Ub3VjaGVkRm46IEZ1bmN0aW9uID0gKCkgPT4ge307XG5cbiAgcHJpdmF0ZSBkZWZhdWx0RmxhdHBpY2tyT3B0aW9uczogRmxhdHBpY2tyT3B0aW9ucyA9IHtcbiAgICB3cmFwOiB0cnVlLFxuICAgIGNsaWNrT3BlbnM6IHRydWUsXG4gICAgb25DaGFuZ2U6IChzZWxlY3RlZERhdGVzOiBhbnkpID0+IHtcbiAgICAgIHRoaXMud3JpdGVWYWx1ZShzZWxlY3RlZERhdGVzKTtcbiAgICB9LFxuICB9O1xuXG4gIEBWaWV3Q2hpbGQoJ2ZsYXRwaWNrcicsIHtcbiAgICBzdGF0aWM6IHRydWUsXG4gIH0pXG4gIGZsYXRwaWNrckVsZW1lbnQ6IGFueTtcblxuICBASW5wdXQoKVxuICBjb25maWc6IEZsYXRwaWNrck9wdGlvbnMgfCB1bmRlZmluZWQ7XG5cbiAgQElucHV0KClcbiAgcGxhY2Vob2xkZXI6IHN0cmluZyA9ICcnO1xuXG4gIEBJbnB1dCgpXG4gIGFkZENsYXNzOiBzdHJpbmcgPSAnJztcblxuICBASW5wdXQoKVxuICBzZXREYXRlOiBzdHJpbmcgfCBEYXRlIHwgdW5kZWZpbmVkO1xuXG4gIEBJbnB1dCgpXG4gIGdldCB0YWJpbmRleCgpIHtcbiAgICByZXR1cm4gdGhpcy5fdGFiaW5kZXg7XG4gIH1cblxuICBzZXQgdGFiaW5kZXgodGk6IG51bWJlcikge1xuICAgIHRoaXMuX3RhYmluZGV4ID0gTnVtYmVyKHRpKTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIGhpZGVCdXR0b24gPSBmYWxzZTtcblxuICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlKHZhbHVlKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xuICAgIHRoaXMucHJvcGFnYXRlQ2hhbmdlID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5vblRvdWNoZWRGbiA9IGZuO1xuICB9XG5cbiAgcHJvcGFnYXRlQ2hhbmdlID0gKF86IGFueSkgPT4ge307XG5cbiAgLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuICBzZXREYXRlRnJvbUlucHV0KGRhdGU6IGFueSkge1xuICAgIHRoaXMuZmxhdHBpY2tyRWxlbWVudC5uYXRpdmVFbGVtZW50Ll9mbGF0cGlja3Iuc2V0RGF0ZShkYXRlLCB0cnVlKTtcbiAgfVxuXG4gIHNldEFsdElucHV0UGxhY2Vob2xkZXIocGxhY2Vob2xkZXI6IHN0cmluZykge1xuICAgIHRoaXMuZmxhdHBpY2tyRWxlbWVudC5uYXRpdmVFbGVtZW50Ll9mbGF0cGlja3IuYWx0SW5wdXQuc2V0QXR0cmlidXRlKCdwbGFjZWhvbGRlcicsIHBsYWNlaG9sZGVyKTtcbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICBpZiAodGhpcy5jb25maWcpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24odGhpcy5kZWZhdWx0RmxhdHBpY2tyT3B0aW9ucywgdGhpcy5jb25maWcpO1xuICAgIH1cbiAgICBpZiAodGhpcy5mbGF0cGlja3JFbGVtZW50Lm5hdGl2ZUVsZW1lbnQuZmxhdHBpY2tyKSB7XG4gICAgICB0aGlzLmZsYXRwaWNrciA9IHRoaXMuZmxhdHBpY2tyRWxlbWVudC5uYXRpdmVFbGVtZW50LmZsYXRwaWNrcih0aGlzLmRlZmF1bHRGbGF0cGlja3JPcHRpb25zKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2V0RGF0ZSkge1xuICAgICAgdGhpcy5zZXREYXRlRnJvbUlucHV0KHRoaXMuc2V0RGF0ZSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmICh0aGlzLmZsYXRwaWNrckVsZW1lbnQubmF0aXZlRWxlbWVudCAmJiB0aGlzLmZsYXRwaWNrckVsZW1lbnQubmF0aXZlRWxlbWVudC5fZmxhdHBpY2tyKSB7XG4gICAgICBpZiAoY2hhbmdlcy5oYXNPd25Qcm9wZXJ0eSgnc2V0RGF0ZScpICYmIGNoYW5nZXNbJ3NldERhdGUnXS5jdXJyZW50VmFsdWUpIHtcbiAgICAgICAgdGhpcy5zZXREYXRlRnJvbUlucHV0KGNoYW5nZXNbJ3NldERhdGUnXS5jdXJyZW50VmFsdWUpO1xuICAgICAgfVxuXG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuY29uZmlnICYmXG4gICAgICAgIHRoaXMuY29uZmlnLmFsdElucHV0ICYmXG4gICAgICAgIGNoYW5nZXMuaGFzT3duUHJvcGVydHkoJ3BsYWNlaG9sZGVyJykgJiZcbiAgICAgICAgY2hhbmdlc1sncGxhY2Vob2xkZXInXS5jdXJyZW50VmFsdWVcbiAgICAgICkge1xuICAgICAgICB0aGlzLnNldEFsdElucHV0UGxhY2Vob2xkZXIoY2hhbmdlc1sncGxhY2Vob2xkZXInXS5jdXJyZW50VmFsdWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uRm9jdXMoZXZlbnQ6IGFueSkge1xuICAgIHRoaXMub25Ub3VjaGVkRm4oKTtcbiAgfVxufVxuIl19