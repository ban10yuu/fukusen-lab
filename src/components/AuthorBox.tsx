export default function AuthorBox() {
  return (
    <div className="border border-red-900/30 rounded-lg p-6 bg-gray-900/50 my-8">
      <div className="flex items-center gap-4 mb-3">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-red-600 to-amber-500 flex items-center justify-center text-white font-bold text-xl">伏</div>
        <div>
          <p className="font-bold text-lg text-white">伏線回収ラボ編集部</p>
          <p className="text-sm text-gray-400">伏線分析歴15年・20作品を徹底解析</p>
        </div>
      </div>
      <p className="text-sm text-gray-300 leading-relaxed">
        漫画作品の伏線を「回収済み」「未回収」「考察」「テクニック」「時系列」の5カテゴリで体系的に分析。日本唯一の伏線特化メディアとして、作品の奥深さを解き明かします。
      </p>
    </div>
  );
}
