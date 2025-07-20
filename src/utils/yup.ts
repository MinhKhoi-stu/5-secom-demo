/* eslint-disable no-template-curly-in-string */
import * as Yup from "yup";

const mixed: Yup.LocaleObject["mixed"] = {
  default: "Không hợp lệ",
  required: "Bắt buộc",
  defined: "Phải được xác định",
  notNull: "Không thể là NULL",
  oneOf: "Phải là một trong các giá trị sau: ${values}",
  notOneOf: "Không được là một trong các giá trị sau: ${values}",
  notType: ({ path, type, value, originalValue }) => {
    // const isCast = originalValue != null && originalValue !== value;
    let msg = `Không đúng dịnh dạng ${type}`;
    // `Phải là một \`${type}\`, `
    // +
    // `Nhưng giá trị cuối cùng là: \`${printValue(value, true)}\`` +
    // (isCast
    //   ? ` (đúc từ giá trị \`${printValue(originalValue, true)}\`).`
    //   : '.');

    if (value === null) {
      msg +=
        `\n Nếu "null" được dự định là một giá trị trống, hãy chắc chắn đánh dấu lược đồ là` +
        " `.nullable()`";
    }

    return msg;
  },
};

const string: Yup.LocaleObject["string"] = {
  length: "Phải chính xác ${length} ký tự",
  min: "Tối thiểu ${min} ký tự",
  max: "Tối đa ${max} ký tự",
  matches: 'Phải phù hợp như sau: "${regex}"',
  email: "Phải là một email hợp lệ",
  url: "Phải là một URL hợp lệ",
  uuid: "Phải là UUID hợp lệ",
  trim: "Phải là một chuỗi được cắt",
  lowercase: "Phải là chữ thường",
  uppercase: "Phải là chữ hoa",
};

const number: Yup.LocaleObject["number"] = {
  min: "Phải lớn hơn hoặc bằng ${min}",
  max: "Phải nhỏ hơn hoặc bằng ${max}",
  lessThan: "Phải nhỏ hơn ${less}",
  moreThan: "Phải lớn hơn ${more}",
  positive: "Phải là một số dương",
  negative: "Phải là số âm",
  integer: "Phải là một số nguyên",
};

const date: Yup.LocaleObject["date"] = {
  min: "Phải muộn hơn ${min}",
  max: "Phải sớm hơn ${max}",
};

const boolean: Yup.LocaleObject["boolean"] = {
  isValue: "Phải là ${value}",
};

const object: Yup.LocaleObject["object"] = {
  noUnknown:
    "Không thể có các khóa không được chỉ định trong hình dạng đối tượng",
};

const array: Yup.LocaleObject["array"] = {
  length: "Phải chính xác ${length} phần tử",
  min: "Tối thiểu ${min} phần tử",
  max: "Tối đa ${max} phần tử",
};

const yupLocale: Yup.LocaleObject = {
  mixed: mixed,
  string: string,
  number: number,
  date: date,
  boolean: boolean,
  object: object,
  array: array,
};

Yup.setLocale(yupLocale);
export { Yup };
