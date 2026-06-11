export default function AuthorBox() {
  return (
    <div className="double-rule bg-parchment-dark/60 p-6 my-8">
      <div className="flex items-center gap-4 mb-3">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#a4823f] to-[#b06a3b] flex items-center justify-center text-parchment-light font-serif font-extrabold text-xl shadow-[inset_0_0_0_2px_rgba(247,241,226,0.35)]">
          伏
        </div>
        <div>
          <p className="font-serif font-bold text-lg text-sepia-900 tracking-wide">伏線回収ラボ編集部</p>
          <p className="text-sm text-sepia-500">伏線分析歴15年・20作品を徹底解析</p>
        </div>
      </div>
      <p className="text-sm text-sepia-700 leading-relaxed">
        漫画作品の伏線を「回収済み」「未回収」「考察」「テクニック」「時系列」の5カテゴリで体系的に分析。日本唯一の伏線特化メディアとして、作品の奥深さを解き明かします。
      </p>
    </div>
  );
}
