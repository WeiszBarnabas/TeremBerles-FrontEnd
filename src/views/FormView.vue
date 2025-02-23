<template>
    <h1><strong>Rendezvénybejelentő űrlap - Széchenyi István Egyetem</strong></h1>
    <p>Tisztelt Űrlapkitöltő!</p>
    <p>Jelen űrlap célja, hogy a Széchenyi István Egyetem Rendezvényszabályzatában foglaltaknak megfelelően bejelentést
        tegyen rendezvényéről. Az űrlapot kérjük figyelmesen és precízen töltse ki, annak érdekében, hogy a szakmai
        kollégák mihamarabb megadhassák engedélyüket a rendezvényre. Amennyiben kérdés merül fel Önben, kérjük keresse
        kollégánkat a <a href="mailto:rendezveny@sze.hu">rendezveny@sze.hu</a> e-mail címen vagy a 06 96 503 400
        (mellék: 3825) telefonszámon.</p>

    <div>A RENDEZVÉNY ADATAI:</div>


    <div>
        <div>Rendezvény neve</div>
        <TextInput/>
    </div>
    <div>
        <div>Rendezvény leírása</div>
        <textarea cols="30" rows="3"></textarea>

    </div>
    <div>
        <div>Rendezvény helyszíne </div>
        <div><input id="text2" type="text" maxlength="255"></div>
    </div>
    <div>
        <div>Rendezvény pontos címe: </div>
        <div><input id="text3" type="text" maxlength="255"></div>
        <div>Formátum: 9026 Győr, Egyetem tér 1.</div>
    </div>
    <div>
        <div>Rendezvény kezdő dátuma </div>
        <div><input type="text" id="">
        </div>
    </div>
    <div>
        <div>Rendezvény kezdő időpontja </div>
        <div><input id="text5" type="text" maxlength="255" autocomplete="off">

        </div>
    </div>
    <div>
        <div>Rendezvény záró dátuma </div>
        <div><input type="text" id="">

        </div>
    </div>
    <div>
        <div>Rendezvény záró időpontja </div>
        <div><input id="text7" type="text" maxlength="255" autocomplete="off">

        </div>
    </div>
    <div>
        <div>Rendezvény típusa </div>
        <div>
            <label><input class="radio" type="radio"> Egyetemi szervezésű
                rendezvények</label><br>
            <label><input class="radio" type="radio"> Hallgatói
                rendezvények</label><br>
            <label><input class="radio" type="radio"> Külső szervezésű
                rendezvények</label><br>
            <label><input class="radio" type="radio">
                Sportrendezvények</label><br>
        </div>

    </div>
    <div>
        <div>Rendezvény minősítése </div>
        <div>
            <label><input class="radio" type="radio"> Nyilvános</label><br>
            <label><input class="radio" type="radio"> Zártkörű</label><br>
        </div>

    </div>
    <div>
        <div>Rendezvény résztvevőinek várható létszáma (fő)
        </div>
        <div><input id="text8" type="text" maxlength="255"></div>
    </div>
    <div>
        <div>Sajtónyilvános rendezvény? </div>
        <div>
            <label><input class="radio" type="radio"> igen</label><br>
            <label><input class="radio" type="radio"> nem</label><br>
        </div>

    </div>
    <div>
        <div>A RENDEZVÉNY RÉSZLETES ADATAI</div>

    </div>
    <div>
        <div>Rendezvény jellege </div>
        <div><input id="text9" type="text" maxlength="255"></div>
        <div>Például: konferencia, workshop, koncert, stb.</div>
    </div>
    <div>
        <div>Részletes programterv </div>
        <div><textarea cols="30" rows="3"></textarea></div>

    </div>
    <div>
        <div>Helyszín berendezési módja &nbsp;</div>
        <div><textarea cols="30" rows="3"></textarea></div>
        <div>Csatolva is megfelelő, amennyiben nem tudja megadni a berendezés módját,
            kollégáink felveszik Önnel a kapcsolatot.</div>
    </div>
    <div>
        <div>Van a rendezvény idejére szállásigénye?
        </div>
        <div>
            <label><input class="radio" type="radio"> igen</label><br>
            <label><input class="radio" type="radio"> nem</label><br>
        </div>

    </div>
    <div>
        <div></div>
    </div>
    <div>
        <div>Szállásigény várható létszáma: </div>
        <div><input id="text10" type="text" maxlength="255"></div>
    </div>
    <div>
        <div></div>
    </div>
    <div class="input-box ib-rad grp2 cl">
        <div>Van parkolóhely igénye? </div>
        <div>
            <label><input class="radio" type="radio"> igen</label><br>
            <label><input class="radio" type="radio"> nem</label><br>
        </div>

    </div>
    <div>
        <div></div>
    </div>
    <div>
        <div>Várható gépkocsiforgalom és parkolóhely igény
        </div>
        <div><textarea cols="30" rows="3"></textarea></div>

    </div>
    <div>
        <div></div>
    </div>
    <div>
        <div>Keletkezik hulladék? </div>
        <div>
            <label><input class="radio" type="radio"> igen</label><br>
            <label><input class="radio" type="radio"> nem</label><br>
        </div>

    </div>
    <div>
        <div></div>
    </div>
    <div>
        <div>Hulladék elszállításának módja </div>
        <div>
            <label><input class="radio" type="radio"> Saját úton</label><br>
            <label><input class="radio" type="radio"> Egyetem által
                biztosítva</label><br>
        </div>

    </div>
    <div>
        <div></div>
    </div>
    <div>
        <div>Ki végzi a hulladék elszállítását? </div>
        <div><input id="text11" type="text" maxlength="255"></div>
    </div>
    <div>
        <div></div>
    </div>
    <div>
        <div>Szükséges internetkapcsolat (WiFi) a rendezvény idejére? </div>
        <div>
            <label><input class="radio" type="radio"> igen</label><br>
            <label><input class="radio" type="radio"> nem</label><br>
        </div>

    </div>
    <div>
        <div>Szükséges-e oktatástechnikai támogatás?
        </div>
        <div>
            <label><input class="radio" type="radio"> igen</label><br>
            <label><input class="radio" type="radio"> nem</label><br>
        </div>
        <div>laptop, projektor, prezenter, stb.</div>
    </div>
    <div>
        <div></div>
    </div>
    <div>
        <div>Oktatástechnikai eszközigény </div>
        <div><input id="text12" type="text" maxlength="255"></div>
    </div>
    <div>
        <div></div>
    </div>
    <div>
        <div>Korlátozott mozgású személyek részt vesznek?
        </div>
        <div>
            <label><input class="radio" type="radio"> igen</label><br>
            <label><input class="radio" type="radio"> nem</label><br>
        </div>

    </div>
    <div>
        <div>Fotó és/vagy videófelvétel készül-e a rendezvényen? </div>
        <div>
            <label><input class="radio" type="radio"> igen</label><br>
            <label><input class="radio" type="radio"> nem</label><br>
        </div>
        <div>Fényképezőgép, videokamera, GoPro, drón, stb.</div>
    </div>
    <div>
        <div></div>
    </div>
    <div>
        <div>Milyen eszközzel fog történni? </div>
        <div><input id="text13" type="text" maxlength="255"></div>
    </div>
    <div>
        <div></div>
    </div>
    <div>
        <div>Lesz a rendezvény területén catering? </div>
        <div>
            <label><input class="radio" type="radio"> igen</label><br>
            <label><input class="radio" type="radio"> nem</label><br>
        </div>

    </div>
    <div>
        <div></div>
    </div>
    <div>
        <div>Catering típusa </div>
        <div>
            <label><input type="checkbox"> hideg étel</label><br>
            <label><input type="checkbox"> meleg étel</label><br>
            <label><input type="checkbox"> kávé, tea,
                üdítő</label><br>
        </div>
        <div>Az egyetemen tartandó rendezvények esetében a catering szolgáltatásában az egyetem
            partnerei állnak rendelkezésre. Kollégáink felveszik Önnel a kapcsolatot és bővebb tájékoztatást
            küldenek.</div>
    </div>
    <div>
        <div></div>
    </div>
    <div>
        <div>Várhatóak a rendezvényen építési és bontási munkálatok? </div>
        <div>
            <label><input class="radio" type="radio"> igen</label><br>
            <label><input class="radio" type="radio"> nem</label><br>
        </div>

    </div>
    <div>
        <div></div>
    </div>
    <div>
        <div>Rendezvényterület igénybevételének dátuma
        </div>
        <div><input type="text" id="">

        </div>
    </div>

    <div>Rendezvényterület igénybevételének időpontja </div>
    <div><input id="text15" type="text" maxlength="255" autocomplete="off"></div>
    <div>
        <div>Rendezvényterület visszaadásának dátuma
        </div>
        <div><input type="text" id="">

        </div>
    </div>
    <div>
        <div>Rendezvényterület igénybevételének időpontja
        </div>
        <div><input id="text17" type="text" maxlength="255" autocomplete="off"></div>
    </div>
    <div>
        <div>Rendezvényen megjelenő alvállalkozók
        </div>
        <div><input id="text18" type="text" maxlength="255">
        </div>
    </div>
    <div>
        <div>Lesz-e magasban végzett tevékenység az építés során? </div>
        <div>
            <label><input class="radio" type="radio"> igen</label><br>
            <label><input class="radio" type="radio"> nem</label><br>
        </div>

    </div>
    <div>
        <div>Szükséges-e állvány az építéshez? </div>
        <div>
            <label><input class="radio" type="radio"> igen</label><br>
            <label><input class="radio" type="radio"> nem</label><br>
        </div>

    </div>
    <div>
        <div>Lesz-e rendezvényelemek kézi anyagmozgatása?
        </div>
        <div>
            <label><input class="radio" type="radio"> igen</label><br>
            <label><input class="radio" type="radio"> nem</label><br>
        </div>

    </div>
    <div>
        <div>Lesz-e rendezvényelemek gépi anyagmozgatása?
        </div>
        <div>
            <label><input class="radio" type="radio"> igen</label><br>
            <label><input class="radio" type="radio"> nem</label><br>
        </div>

    </div>
    <div>
        <div></div>
    </div>
    <div>
        <div>Gépi anyagmozgatás eszköze </div>
        <div>
            <label><input type="checkbox">
                targonca</label><br>
            <label><input type="checkbox"> daru</label><br>
            <label><input type="checkbox"> egyéb emelő
                eszköz</label><br>
        </div>

    </div>
    <div>
        <div></div>
    </div>
    <div>
        <div>Gépi anyagmozgatás eszköze </div>
        <div><input id="text19" type="text" maxlength="255">
        </div>
    </div>
    <div>
        <div></div>
    </div>
    <div>
        <div>Igényel takarítást a rendezvény előtt?
        </div>
        <div>
            <label><input class="radio" type="radio"> igen</label><br>
            <label><input class="radio" type="radio"> nem</label><br>
        </div>
        <div>Szükséges lehet, amennyiben építési munkálatok vannak a rendezvényt
            megelőzően.</div>
    </div>
    <div>
        <div>Igényel takarítási ügyeletet a rendezvény alatt? </div>
        <div>
            <label><input class="radio" type="radio"> igen</label><br>
            <label><input class="radio" type="radio"> nem</label><br>
        </div>

    </div>
    <div>
        <div>Szükséges villanyszerelői ügyelet?
        </div>
        <div>
            <label><input type="checkbox"> rendezvény
                előtt</label><br>
            <label><input type="checkbox"> rendezvény
                közben</label><br>
            <label><input type="checkbox"> rendezvény
                után</label><br>
            <label><input type="checkbox"> nem
                szükséges</label><br>
        </div>

    </div>
    <div>
        <div>Szükséges rendezvényszekrényből áram vételezése? </div>
        <div>
            <label><input class="radio" type="radio"> igen</label><br>
            <label><input class="radio" type="radio"> nem</label><br>
        </div>

    </div>
    <div>
        <div></div>
    </div>
    <div>
        <div>Áramigény </div>
        <div><input id="text20" type="text" maxlength="255">
        </div>
    </div>
    <div>
        <div></div>
    </div>
    <div>
        <div>Tűzveszélyes tevékenység várható-e?
        </div>
        <div>
            <label><input class="radio" type="radio"> igen</label><br>
            <label><input class="radio" type="radio"> nem</label><br>
        </div>

    </div>
    <div>
        <div></div>
    </div>
    <div>
        <div>Tűzveszélyes tevékenység leírása </div>
        <div><input id="text21" type="text" maxlength="255">
        </div>
    </div>
    <div>
        <div></div>
    </div>
    <div class="input-box ib-jel grp21 cl">
        <div>Várható-e az alábbi tevékenységek közül valamelyik? </div>
        <div>
            <label><input type="checkbox"> por</label><br>
            <label><input type="checkbox"> füst</label><br>
            <label><input type="checkbox">
                páraképződés</label><br>
            <label><input type="checkbox" checked="checked">
                egyik sem várható</label><br>
        </div>

    </div>
    <div>
        <div>Vegyi anyag felhasználása várható-e?
        </div>
        <div>
            <label><input class="radio" type="radio"> igen</label><br>
            <label><input class="radio" type="radio"> nem</label><br>
        </div>

    </div>
    <div>
        <div></div>
    </div>
    <div>
        <div>Tevékenység leírása </div>
        <div><input id="text22" type="text" maxlength="255">
        </div>
    </div>
    <div>
        <div></div>
    </div>
    <div>
        <div>Várható-e dekoráció a helyiség légterében?
        </div>
        <div>
            <label><input class="radio" type="radio"> igen</label><br>
            <label><input class="radio" type="radio"> nem</label><br>
        </div>

    </div>
    <div>
        <div class="box-label a1">A RENDEZVÉNYÉRT FELELŐS SZEMÉLY (SZERVEZŐ) ADATAI:</div>

    </div>
    <div>
        <div>Teljes név </div>
        <div><input id="text23" type="text" maxlength="255">
        </div>
    </div>
    <div>
        <div>Telefonszám </div>
        <div><input id="text24" type="text" maxlength="255">
        </div>
    </div>
    <div>
        <div>E-mail cím &nbsp;</div>
        <div><input id="text25" type="text" maxlength="255">
        </div>
    </div>
    <div>
        <div>Lakcím </div>
        <div><input id="text26" type="text" maxlength="255">
        </div>
    </div>
    <div>
        <div>Van a rendezvénynek további szervezője?
        </div>
        <div>
            <label><input class="radio" type="radio"> igen</label><br>
            <label><input class="radio" type="radio"> nem</label><br>
        </div>

    </div>
    <div>
        <div></div>
    </div>
    <div>
        <div>Teljes név </div>
        <div><input id="text27" type="text" maxlength="255">
        </div>
    </div>
    <div>
        <div>Neptun kód &nbsp;</div>
        <div><input id="text28" type="text" maxlength="255">
        </div>
    </div>
    <div>
        <div>Telefonszám </div>
        <div><input id="text29" type="text" maxlength="255">
        </div>
    </div>
    <div>
        <div>E-mail cím </div>
        <div><input id="text30" type="text" maxlength="255">
        </div>
    </div>
    <div>
        <div>Lakcím </div>
        <div><input id="text31" type="text" maxlength="255">
        </div>
    </div>
    <div>
        <div></div>
    </div>
    <div>
        <div>MEGRENDELŐ (JOGI HÁTTÉR ESETÉN):</div>

    </div>
    <div c>
        <div>Név/Cégnév &nbsp;</div>
        <div><input id="text32" type="text" maxlength="255">
        </div>
    </div>
    <div c>
        <div>Cím &nbsp;</div>
        <div><input id="text33" type="text" maxlength="255">
        </div>
    </div>
    <div c>
        <div>Adószám &nbsp;</div>
        <div><input id="text34" type="text" maxlength="255">
        </div>
    </div>
    <div c>
        <div>Telefonszám &nbsp;</div>
        <div><input id="text35" type="text" maxlength="255">
        </div>
    </div>
    <div c>
        <div>E-mail cím &nbsp;</div>
        <div><input id="text36" type="text" maxlength="255">
        </div>
    </div>
    <div>
        <div>FÁJLFELTÖLTÉS</div>

    </div>
    <div>
        <div></div>
    </div>
    <div>
        <div>1. számú melléklet Rendezvénybejelentő nyomtatvány HÖK részre</div>
        <input type="file">
        <div>Max. méret 6Mb</div>

    </div>
    <div>
        <div></div>
    </div>
    <div>
        <div>Helyszín berendezési rajz (nem kötelező)</div>
        <input type="file">
        <div>Max. méret 6Mb</div>

    </div>
    <div>
        <div>Az űrlap kitöltésével és elküldésével büntetőjogi felelősségem teljes tudatában
            kijelentem, hogy az általam megadott adatok a valóságnak teljes mértékben megfelelnek és saját
            akaratomból adtam meg azokat. Továbbá hozzájárulok ahhoz, hogy adataimat a Széchenyi István Egyetem
            nevében eljáró személyek a személyi adatok védelméről és a közérdekű adatok nyilvánosságáról szóló
            1992. évi LXIII. törvénynek megfelelően kezelje. </div>
        <div><input type="checkbox"></div>

    </div>
    <div>
        <div>A Széchenyi István Egyetem hatályban lévő Rendezvényszabályzatát elfogadom.
        </div>
        <div><input type="checkbox"></div>
        <div>
            <p>A Rendezvényszabályzat <a href="https://munkatars.sze.hu/downloadmanager/details/id/43020/m/13936"
                    target="_blank">ide
                    kattintva</a> érhető el.</p>
        </div>
    </div>



    <button>Küldés</button>

</template>

<script setup>
import TextInput from '@/components/TextInput.vue';


</script>