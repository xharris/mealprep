export class MomentUtil {
  static hmsFormat(time) {
    var format_str = [];
    if (time.hours() > 0) format_str.push("h[h]");
    if (time.minutes() > 0) format_str.push("m[m]");
    if (time.seconds() > 0) format_str.push("s[s]");
    return time.format(format_str.join(" "));
  }
}

export const wrapX = (x, x_min, x_max) =>
  ((((x - x_min) % (x_max - x_min)) + (x_max - x_min)) % (x_max - x_min)) +
  x_min;

export class Meal {
  constructor(db_info) {
    this.info = db_info;
    ["name", "time", "image"].forEach(key => {
      Object.defineProperty(this, key, {
        get: () => this.info[key],
        set: v => {
          // store in databse
          this.info[key] = v;
        }
      });
    });
  }
  get id() {
    return this.info.id;
  }
  filterTags(tags) {
    return (
      tags.length === 0 ||
      tags.some(
        tag => tag.key === "name" && this.name.toLowerCase().includes(tag.value)
      )
    );
  }
}
