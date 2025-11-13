export const getGridRowSize = () => {
  // Figma design: Header 45px, Row 81px
  let rowHeight = 81;
  let headerHeight = 45;

  if (typeof window === 'undefined') {
    return { rowHeight, headerHeight };
  }

  // Responsive sizes for smaller screens
  if (window.innerWidth < 1100) {
    rowHeight = 60;
    headerHeight = 40;
  }

  if (window.innerWidth < 1280) {
    rowHeight = 70;
    headerHeight = 42;
  }

  return { rowHeight, headerHeight };
};
export const isBlank = (str?: string): boolean =>
  str == null || /^\s*$/.test(str);

export const uuid = (a?: number): string => {
  if (a != null) {
    // eslint-disable-next-line no-bitwise
    return (a ^ ((Math.random() * 16) >> (a / 4))).toString(16);
  } else {
    // eslint-disable-next-line
    //@ts-ignore
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);
  }
};

export const formatNumber = (
  value?: number | string,
  options?: {
    digit?: number;
    offsetRate?: number;
    toFixed?: boolean;
    failoverValue?: string;
    isSkipRound?: boolean;
    floor?: boolean;
    showPlusPrefix?: boolean;
    showMiniPrefix?: boolean;
  },
) => {
  const {
    digit,
    offsetRate,
    toFixed,
    failoverValue,
    isSkipRound,
    floor,
    showPlusPrefix,
    showMiniPrefix,
  } = options ?? {};
  if (value == null || isNaN(Number(value))) {
    return failoverValue ?? '0';
  }

  let data = Number(value);

  if (offsetRate != null) {
    data = data / offsetRate;
  }

  let tempValueString = data.toString();
  let prefix = showPlusPrefix ? '+' : showMiniPrefix ? '-' : '';

  if (tempValueString.startsWith('-')) {
    prefix = '-';
    tempValueString = tempValueString.substring(1, tempValueString.length);
  }

  try {
    const tempValue = Number(tempValueString);
    const fractionDigit = digit ?? 0;

    let mainNum = Number(`${Number(tempValue.toString())}e+${fractionDigit}`);
    if (!isSkipRound) {
      mainNum = floor ? Math.floor(mainNum) : Math.round(mainNum);
    }
    const thousandSeparator = '.';
    const decimalSeparator = '.';
    const newDecimalSeparator = ',';
    if (fractionDigit > 0) {
      const temp = +`${mainNum}e-${fractionDigit}`;
      let fractionString = '';
      let i = '';
      if (toFixed) {
        i = temp.toFixed(fractionDigit);
        fractionString = i.substring(i.indexOf(decimalSeparator), i.length);
        i = i.substring(0, i.indexOf(decimalSeparator));
        return (
          prefix +
          i.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator) +
          fractionString.replace(decimalSeparator, newDecimalSeparator)
        );
      }

      i = temp.toString();
      if (temp.toString().indexOf(decimalSeparator) >= 1) {
        fractionString = temp
          .toString()
          .substring(
            temp.toString().indexOf(decimalSeparator),
            temp.toString().length,
          );
        i = temp
          .toString()
          .substring(0, temp.toString().indexOf(decimalSeparator));
      }
      return (
        prefix +
        i.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator) +
        fractionString.replace(decimalSeparator, newDecimalSeparator)
      );
    }

    const temp = +`${mainNum}e-${fractionDigit}`;
    const i = temp.toString();
    return prefix + i.replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator);
  } catch {
    return '';
  }
};
