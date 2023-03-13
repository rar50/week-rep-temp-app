import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {
  inputName: string = '';
  inputDay: string = '';
  inputStartTime = '10:00';
  inputEndTime = '19:00';
  dates: { day: string; date: string; time: string }[] = [];
  //表示切替用のフラグ
  displayFlag: boolean = false;
  // エラーメッセージ用
  errMess: string[] = [];
  // 本文の枠組みの言葉を保存しておく
  tyuuiStr: string =
    '※月末の作業報告書と差異があった場合は作業報告書の方を正としてください';
  sagyouStr: string = '◇　作業内容　◇';
  soukatuStr: string = '◇　今週の作業について総括　◇';
  sonotaStr: String = '◇　その他連絡事項　◇';

  constructor() {
    let str: string;
  }

  ngOnInit(): void {}

  make() {
    this.errMess = [];
    // 入力内容チェック
    if (this.inputCheck()) {
      this.displayFlag = true;
    } else {
      // 入力内容に応じてエラーメッセージを格納
      this.errMesFunc();
      this.displayFlag = false;
    }
    this.weekDayMake(this.inputDay);
  }

  weekDayMake(inputDay: string) {
    const dayOfWeek = ['(日)', '(月)', '(火)', '(水)', '(木)', '(金)', '(土)'];
    // 日付を格納する配列
    this.dates = [];
    // 引数の文字列から月と日を取得
    const month = parseInt(inputDay.slice(0, 2));
    const day = parseInt(inputDay.slice(2, 4));
    // 引数の月と日を元に、Dateオブジェクトを作成
    const date = new Date(new Date().getFullYear(), month - 1, day);

    for (let i = 0; i < 7; i++) {
      const day = dayOfWeek[date.getDay()];
      // 月日を取得
      const month = date.getMonth() + 1;
      const dayOfMonth = date.getDate();
      // 日付の文字列を作成
      const dateStr = `${month}月${dayOfMonth}日`;
      let timeStr = this.inputStartTime + '～' + this.inputEndTime;
      if (day.includes('日') || day.includes('土')) {
        timeStr = '※休み';
      }
      // 日付、曜日、時間をオブジェクトに格納して、配列に追加
      this.dates.push({ day: day, date: dateStr, time: timeStr });

      date.setDate(date.getDate() + 1);
    }
  }
  // 入力内容が正しいかのチェック
  inputCheck() {
    //名前と基本時間、週開始日が入力されているか
    if (
      this.inputName &&
      this.inputStartTime &&
      this.inputEndTime &&
      this.validateDateInput(this.inputDay)
    ) {
      return true;
    } else {
      return false;
    }
  }
  // inputDayがMMDD形式かチェック
  validateDateInput(dateInput: string): boolean {
    const DATE_REGEX = /^(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/;
    return DATE_REGEX.test(dateInput);
  }

  // 入力内容に応じてエラーメッセージを格納する
  errMesFunc() {
    if (!this.inputName) {
      this.errMess.push('名前が未入力です');
    }
    if (!this.inputDay) {
      this.errMess.push('週開始日が未入力です');
    } else if (!this.validateDateInput(this.inputDay)) {
      this.errMess.push('週開始日の入力形式がMMDD以外です');
    }
    if (!this.inputStartTime) {
      this.errMess.push('勤務開始時間が未入力です');
    }
    if (!this.inputEndTime) {
      this.errMess.push('勤務終了時間が未入力です');
    }
  }

  //開いた結果を閉じる
  back(){
    this.displayFlag = false;
  }
}
