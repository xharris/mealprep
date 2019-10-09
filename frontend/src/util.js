export class MomentUtil {
  static hmsFormat(time) {
    var format_str = [];
    if (time.hours() > 0) format_str.push("h[h]");
    if (time.minutes() > 0) format_str.push("m[m]");
    if (time.seconds() > 0) format_str.push("s[s]");
    return time.format(format_str.join(" "));
  }
}
