import { useState } from 'react';
import { Calendar, Clock, User, MessageSquare, Sparkles } from 'lucide-react';

const App = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [selectedMenu, setSelectedMenu] = useState('');
  const [notes, setNotes] = useState('');

  // 時間オプションを生成（11:30-13:30、20分間隔）
  const generateTimeSlots = () => {
    const slots = [];
    const startTime = 11 * 60 + 30; // 11:30を分で表現
    const endTime = 13 * 60 + 30;   // 13:30を分で表現
    
    for (let time = startTime; time <= endTime; time += 20) {
      const hours = Math.floor(time / 60);
      const minutes = time % 60;
      const timeString = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      slots.push(timeString);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();
	const bookedSlots = ['11:30', '12:50']; // 予約済みの時間

  const menus = ['ヘッドマッサージ', 'リンパマッサージ', '耳つぼマッサージ', 'ハンドマッサージ'];

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime || !customerName || !selectedMenu) {
      alert('必須項目を全て入力してください。');
      return;
    }

    alert(`予約が完了しました！\n\n日付: ${selectedDate}\n時間: ${selectedTime}\nお名前: ${customerName}\n施術メニュー: ${selectedMenu}\n備考: ${notes || 'なし'}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-purple-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-rose-500" />
            <h1 className="text-3xl font-bold text-gray-800">出張リラクゼーション</h1>
          </div>
          <p className="text-gray-600">施術のご予約はこちらから</p>
        </div>

        {/* 予約フォーム */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* 日付選択 */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-lg font-semibold text-gray-700">
              <Calendar className="w-5 h-5 text-rose-500" />
              予約日
            </label>
            <div className="grid grid-cols-2 gap-3">
              {['7月12日', '7月24日'].map((date) => (
                <button
                  key={date}
                  type="button"
                  onClick={() => setSelectedDate(date)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    selectedDate === date
                      ? 'border-rose-500 bg-rose-50 text-rose-700 shadow-md'
                      : 'border-gray-200 hover:border-rose-300 hover:bg-rose-25'
                  }`}
                >
                  <div className="font-semibold">{date}</div>
                  <div className="text-sm text-gray-500">
                    {date === '7月12日' ? '(金曜日)' : '(水曜日)'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 時間選択 */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-lg font-semibold text-gray-700">
              <Clock className="w-5 h-5 text-rose-500" />
              予約時間
            </label>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time) => {
								const isBooked = bookedSlots.includes(time);

								return (
                 <button
                    key={time}
                    type="button"
                    onClick={() => !isBooked && setSelectedTime(time)}
                    disabled={isBooked}
                    className={`p-3 rounded-lg border-2 transition-all duration-200 relative ${
                      isBooked
                        ? 'border-gray-300 bg-gray-100 text-gray-400 cursor-not-allowed'
                        : selectedTime === time
                        ? 'border-rose-500 bg-rose-50 text-rose-700 shadow-md'
                        : 'border-gray-200 hover:border-rose-300 hover:bg-rose-25'
                    }`}
                  >
                  {time}
									{isBooked && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs bg-gray-500 text-white px-2 py-1 rounded-full">
                          予約済み
                        </span>
                      </div>
                    )}
                </button>
								)})}
            </div>
          </div>

          {/* お名前入力 */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-lg font-semibold text-gray-700">
              <User className="w-5 h-5 text-rose-500" />
              お名前
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="お名前を入力してください"
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:outline-none transition-colors duration-200"
            />
          </div>

          {/* 施術メニュー選択 */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-lg font-semibold text-gray-700">
              <Sparkles className="w-5 h-5 text-rose-500" />
              施術メニュー
            </label>
            <div className="grid grid-cols-2 gap-3">
              {menus.map((menu) => (
                <button
                  key={menu}
                  type="button"
                  onClick={() => setSelectedMenu(menu)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    selectedMenu === menu
                      ? 'border-rose-500 bg-rose-50 text-rose-700 shadow-md'
                      : 'border-gray-200 hover:border-rose-300 hover:bg-rose-25'
                  }`}
                >
                  <div className="font-semibold">{menu}</div>
                  <div className="text-sm text-gray-500 mt-1">
                    {menu === 'ヘッドマッサージ' && '頭部のリラクゼーション'}
                    {menu === 'リンパマッサージ' && '全身のリンパケア'}
                    {menu === '耳つぼマッサージ' && '耳つぼで健康促進'}
                    {menu === 'ハンドマッサージ' && '手のケアとリラックス'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 備考欄 */}
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-lg font-semibold text-gray-700">
              <MessageSquare className="w-5 h-5 text-rose-500" />
              備考
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="ご要望やアレルギーなどがございましたらご記入ください"
              rows={4}
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-rose-500 focus:outline-none transition-colors duration-200 resize-none"
            />
          </div>

          {/* 予約ボタン */}
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-rose-500 to-purple-500 text-white font-bold py-4 px-6 rounded-xl hover:from-rose-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            予約を確定する
          </button>
        </div>

        {/* 注意事項 */}
        <div className="mt-6 p-4 bg-white/60 rounded-xl">
          <h3 className="font-semibold text-gray-700 mb-2">ご注意事項</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• 予約の変更・キャンセルはお電話もしくは公式LINEよりご連絡ください</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;