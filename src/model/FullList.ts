import ListItem from "./ListItem";

interface List {
  list: ListItem[];
  load(): void;
  save(): void;
  remove(id: string): void;
  add(itemObj: ListItem): void;
  clearList(): void;
}

export default class FullList implements List {
  static instance: FullList = new FullList();

  private constructor(private _list: ListItem[] = []) {}

  get list(): ListItem[] {
    return this._list;
  }

  load(): void {
    // console.log("loading list...");
    const storedList: string | null = localStorage.getItem("TSList");
    if (typeof storedList !== "string") return;

    const parsedList: { _id: string; _item: string; _checked: boolean }[] =
      JSON.parse(storedList);
    // console.log(parsedList);

    parsedList.forEach((itemObj) => {
      const newListItem = new ListItem(
        itemObj._id,
        itemObj._item,
        itemObj._checked
      );
      //   console.log(newListItem);
      FullList.instance.add(newListItem);
    });
  }

  save(): void {
    localStorage.setItem("TSList", JSON.stringify(this._list));
  }

  clearList(): void {
    this._list = [];
    this.save();
  }

  add(itemObj: ListItem): void {
    this._list.push(itemObj);
    this.save();
  }

  remove(id: string): void {
    this._list = this._list.filter((item) => item.id !== id);
    this.save();
  }
}
