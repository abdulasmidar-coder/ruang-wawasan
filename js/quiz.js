const questions = [
  {q:"Apa langkah paling tepat sebelum membagikan informasi yang sedang viral?",a:["Langsung membagikannya","Memeriksa sumber dan konteksnya","Mengikuti komentar terbanyak","Mengubah judul agar menarik"],correct:1,why:"Informasi perlu diperiksa sumber, bukti, tanggal, dan konteksnya sebelum dibagikan."},
  {q:"Kritik yang etis sebaiknya diarahkan kepada ...",a:["Identitas pribadi seseorang","Keluarga pihak yang berbeda pendapat","Gagasan atau argumen yang sedang dibahas","Fisik dan latar belakang seseorang"],correct:2,why:"Kritik yang sehat membahas gagasan atau tindakan, bukan merendahkan pribadi."},
  {q:"Apa arti toleransi dalam diskusi digital?",a:["Harus menyetujui semua pendapat","Menghindari semua diskusi","Menghormati perbedaan tanpa harus selalu setuju","Membalas komentar keras dengan hinaan"],correct:2,why:"Toleransi berarti menghormati martabat orang lain sekalipun terdapat perbedaan pandangan."},
  {q:"Mengapa konteks video atau kutipan perlu diperiksa?",a:["Agar konten lebih panjang","Potongan konten dapat mengubah atau menghilangkan makna","Supaya unggahan menjadi viral","Agar tidak perlu mencari sumber lain"],correct:1,why:"Kutipan yang dipotong dapat membuat makna pernyataan menjadi berbeda dari konteks aslinya."},
  {q:"Jika mengetahui informasi yang dibagikan ternyata keliru, tindakan yang tepat adalah ...",a:["Membiarkannya","Menyalahkan pembaca","Menghapus bukti tanpa penjelasan","Mengoreksi dan memberi klarifikasi"],correct:3,why:"Tanggung jawab digital mencakup kesediaan mengoreksi informasi yang salah."}
];
let current=0,score=0,answered=false;
const qText=document.getElementById("question-text"),options=document.getElementById("answer-options"),feedback=document.getElementById("feedback"),next=document.getElementById("next-button"),count=document.getElementById("question-count"),percent=document.getElementById("progress-percent"),fill=document.getElementById("progress-fill");
function renderQuestion(){
  answered=false;const item=questions[current];count.textContent=`Pertanyaan ${current+1} dari ${questions.length}`;percent.textContent=`${Math.round((current+1)/questions.length*100)}%`;fill.style.width=percent.textContent;qText.textContent=item.q;options.innerHTML="";feedback.textContent="";next.disabled=true;next.textContent=current===questions.length-1?"Lihat hasil":"Berikutnya →";
  item.a.forEach((answer,index)=>{const button=document.createElement("button");button.className="answer-option";button.textContent=`${String.fromCharCode(65+index)}. ${answer}`;button.addEventListener("click",()=>selectAnswer(index));options.appendChild(button);});
}
function selectAnswer(index){
  if(answered)return;answered=true;const item=questions[current];const buttons=[...options.children];buttons.forEach((b,i)=>{b.disabled=true;if(i===item.correct)b.classList.add("correct");if(i===index&&i!==item.correct)b.classList.add("wrong");});
  if(index===item.correct){score++;feedback.textContent="Benar! "+item.why;}else{feedback.textContent="Belum tepat. "+item.why;}next.disabled=false;
}
next?.addEventListener("click",()=>{if(!answered)return;if(current<questions.length-1){current++;renderQuestion();}else{document.getElementById("quiz").classList.add("hidden");const result=document.getElementById("quiz-result");result.classList.remove("hidden");document.getElementById("result-score").textContent=`${score*20}/100`;document.getElementById("result-message").textContent=score===5?"Sangat baik! Kamu memahami seluruh prinsip utama.":score>=3?"Bagus! Pelajari kembali bagian yang belum dikuasai.":"Ayo baca kembali materi, lalu coba lagi.";}});
document.getElementById("restart-button")?.addEventListener("click",()=>{current=0;score=0;document.getElementById("quiz").classList.remove("hidden");document.getElementById("quiz-result").classList.add("hidden");renderQuestion();});
if(qText)renderQuestion();
