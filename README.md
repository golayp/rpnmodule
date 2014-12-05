<h1>rpnmodule</h1>
<strong>v0.0.2</strong>
<p>rpnmodule is a project aiming to provide a base library for running educational sequences of modules. It'll provide common features for 8 base module types (maybe more in the future) that can be arranged in a sequence of work:</p>
<p>As the project evolves the main module in the library is rpnsequence, but project name is still rpnmodule... Sorry for confusion!!!!</p>
<h2>Dependencies</h2>
<ul>
    <li>jquery 2.1.1</li>
    <li>bootstrap 3.3.1</li>
    <li>underscore 1.7.0</li>
</ul>
<h2>Introduction</h2>
<ul>
    <li>blackbox - a mathematical module to calculate values back and forth 4 -(x4)-> 16 (sample: http://www.rpn.ch/hosting/iclasse/html5/integrationHTML5/nombres/9_sequNbBN_8.html)</li>
    <li>cardmaze - a maze of card in which you can navigate using questions on card and response on adjacent card (sample: http://www.rpn.ch/hosting/iclasse/MMF/6_html/L1_26_6_Indicatif_Laby_Sequ_1.html)</li>
    <li>clock - a clock you can manipulate to display a given hour (sample: http://www.rpn.ch/hosting/iclasse/html5/integrationHTML5/horloge/9_sequHorloge_1.html)</li>
    <li>dragdropsorting - items you can drag and drop in list of containers to sort (sample: http://www.rpn.ch/hosting/iclasse/MMF/8_html/L1_26_8_FormVerb_TriSac_Sequ_1.html)</li>
    <li>gapfull - (sample: http://www.rpn.ch/hosting/iclasse/AideEval/10/html/AE_AccordGramm_1_5.html)</li>
    <li>gapsimple - (sample: http://www.rpn.ch/hosting/iclasse/AideEval/10/html/AE_ParticipePasse_1_2.html)</li>
    <li>marker - (sample: http://www.rpn.ch/hosting/iclasse/html5/Fra_9_html/L1_36_9_JO_Indicatif_Present_3.html)</li>
    <li>mqc - a multiple question choice (mqc) (samples: http://www.rpn.ch/hosting/iclasse/AideEval/10/html/AE_FonctGramm_1_3.html http://www.rpn.ch/hosting/iclasse/AideEval/10/html/AE_LectureDico_2_1.html http://www.rpn.ch/hosting/iclasse/AideEval/10/html/AE_NuancesSem_3.html)</li>
</ul>
<h2>main options for rpnsequence init</h2>
<ul>
    <li>sequrl - the url where to find json module sequence datas. Default: seq.json</li>
    <li>solurl - the url where to find json module sequence solutions. Default: sol.json</li>
    <li>returnurl - the url launched at end of sequence. Default: ..</li>
    <li>warnonexit - do the module sequence has to display a waring message (html onbeforeunload classic warning)? default: false</li>
    <li>domelem - the element where to add sequence. default: $('body')</li>
    <li>onsequenceend - default: an empty function</li>
    <li>onmoduleend - default: an empty function</li>
    <li>mediapathformatter - a function to update media paths. default: function(val){return 'medias/'+val;}</li>
    <li>language - which language to use for labels? Default:fr available: fr,en</li>
    <li>debug - add some console output. default: false</li>
    <li>navigationEnabled - Does the sequence have to display a navigation pager? default: false</li>
</ul>

<h2>default sequence datas</h2>
By default a sequence json datas has to handle thoses values:
<ul>
    <li>title - the sequence title display along all modules on top of them (first level title)</li>
    <li>modules - a list of modules to display</li>
</ul>
    
<h2>module shared datas</h2>
<ul>
    <li>type - the type of the module itself choose: blackbox|cardmaze|clock|dragdropsorting|gapfull|gapsimple|marker|mqc</li>
    <li>title - a title diplay on top of module (second level title)</li>
    <li>context - a context short description (third level title)</li>
    <li>directive - a directive (fourth level title)</li>
    <li>recall - a recall for student (displayed actually as a modal dialog toggled by a link)</li>
    <li>order - an order for student (displayed actually as a modal dialog toggled by a link) </li>
</ul>

<h2>module specific options</h2>
<h3>blackbox options</h3>
<ul>
    <li>operation - a string to be displayed as the black box operation</li>
    <li>inputtype - the type of input to use (number|text). Default: number</li>
    <li>left - list of values displayed on the left side of the black box</li>
    <li>right - list of values displayed on the right side of the black box</li>
    <li>shuffle - shuffle items? default: false (right items asked first, then left items)</li>
</ul>

<h3>cardmaze options</h3>
<ul>
    <li>mazewidth - the card maze width (in number of cards) [2-6]</li>
    <li>mazeheight - the card maze height (in number of cards) [2-4]</li>
    <li>cards - an array of cards to be displayed (described with label and clue)</li>
</ul>

<h3>clock options</h3>
<ul>
    <li>hour - hour to show on clock dial (00:00 to 23:59)</li>
    <li>random - ask for a random hour (true/false). Default true</li>
</ul>

<h3>dargdropsorting options</h3>
<ul>
    <li>todrag - a list of items to sort in containers</li>
    <li>todrop - a list of containers where to drag and drop items</li>
</ul>

<h3>gapfull options</h3>
<ul>
    <li>sentence - a sentence to change in a input text box as described in the module's directive</li>
</ul>

<h3>gapsimple options</h3>
<ul>
    <li>tofill - a text where words tagged with b are replaced by a input box</li>
    <li>fillers - a list of items to drag and drop in white spaces if not set then user have to type response</li>
</ul>

<h3>marker options</h3>
<ul>
    <li>markers - a list of markers</li>
    <li>tomark - a text where words tagged with b can be marked</li>
</ul>

<h3>mqc options</h3>
<ul>
    <li>questions - a list of questions</li>
    <li>answers - a list of answers common to all questions</li>
</ul>
<h2>sample seq json</h2>
```json
{
    "title":"modulesequence",
    "modules":[
        {
            "type":"mqc",
            "title":"a mqc module",
            "context":"context",
            "directive":"do this",
            "questions":[
                {
                    "val":0,
                    "label" : "Why <strong>doing</strong> this ?"
                },
                {
                    "val":1,
                    "label" : "Who <i>is</i> it ?"
                },
                {
                    "val":2,
                    "label" : "When <u>or</u> what ?"
                },
                {
                    "val":3,
                    "label" : "What ?"
                },
                {
                    "val":4,
                    "label" : "Where ?"
                },
                {
                    "val":5,
                    "label" : "How ?"
                },
                {
                    "val":6,
                    "label" : "Which ?"
                },
                {
                    "val":7,
                    "label" : "Whose ?"
                }
            ],
            "answers":[
                {
                    "val":0,
                    "label":"Yes"
                },
                {
                    "val":1,
                    "label":"No"
                },
                {
                    "val":2,
                    "label":"Maybe"
                }
            ]
        },
         {
            "type":"marker",
            "title":"a marker module",
            "context":"context",
            "directive":"try to mark words",
            "markers":["marker 1","marker 2","marker 3"],
            "tomark":"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <b>Etiam</b> rutrum convallis maximus. Nulla faucibus mi ante, sed efficitur mi <b>ultrices</b> vel.</p><p>Class aptent taciti sociosqu ad litora torquent per <b>conubia</b> nostra, per inceptos himenaeos. Maecenas sem sapien, dictum lobortis malesuada at, pulvinar ac tortor. Donec vitae quam massa. Mauris eu ante nibh. Donec eu dapibus est, id vestibulum urna. Suspendisse eu arcu neque. Mauris sed placerat orci, vel lobortis augue.</p><p>Suspendisse nisi tellus, finibus sit amet rutrum et, molestie quis dolor. Duis pretium ipsum eu sem <b>lobortis</b>, eget varius urna sagittis.</p><p><b>Etiam</b> et dolor sit amet quam finibus faucibus ac porttitor dui. Vestibulum et erat ac nulla cursus gravida et a dui. Nunc egestas purus dui, ac lobortis turpis rhoncus a. Sed ac accumsan eros. Vivamus eget vestibulum augue, vel lacinia orci. Duis vitae leo vel dolor lacinia volutpat fermentum et leo. Sed ac efficitur tellus. Quisque eget commodo ligula.</p><p>In mollis convallis turpis, sit amet luctus purus tempor a. Integer vel convallis arcu, porttitor laoreet mauris. Sed porttitor pharetra purus nec sagittis. Curabitur ac purus finibus, blandit lectus ac, laoreet est. Ut lobortis nisl sit amet <b>fringilla</b> gravida. Donec arcu lectus, porttitor sed vestibulum vitae, vestibulum ut justo. Duis maximus viverra risus, ac finibus enim pellentesque ac. Cras interdum posuere orci, ut ultricies elit ullamcorper ut.</p>"
        },
        {
            "type":"gapsimple",
            "title":"a gapsimple module",
            "context":"",
            "directive":"do this",
            "tofill":"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <b>Etiam</b> rutrum convallis maximus. Nulla faucibus mi ante, sed efficitur mi <b>ultrices</b> vel.</p><p>Class aptent taciti sociosqu ad litora torquent per <b>conubia</b> nostra, per inceptos himenaeos. Maecenas sem sapien, dictum lobortis malesuada at, pulvinar ac tortor. Donec vitae quam massa. Mauris eu ante nibh. Donec eu dapibus est, id vestibulum urna. Suspendisse eu arcu neque. Mauris sed placerat orci, vel lobortis augue.</p><p>Suspendisse nisi tellus, finibus sit amet rutrum et, molestie quis dolor. Duis pretium ipsum eu sem <b>lobortis</b>, eget varius urna sagittis.</p><p><b>Etiam</b> et dolor sit amet quam finibus faucibus ac porttitor dui. Vestibulum et erat ac nulla cursus gravida et a dui. Nunc egestas purus dui, ac lobortis turpis rhoncus a. Sed ac accumsan eros. Vivamus eget vestibulum augue, vel lacinia orci. Duis vitae leo vel dolor lacinia volutpat fermentum et leo. Sed ac efficitur tellus. Quisque eget commodo ligula.</p><p>In mollis convallis turpis, sit amet luctus purus tempor a. Integer vel convallis arcu, porttitor laoreet mauris. Sed porttitor pharetra purus nec sagittis. Curabitur ac purus finibus, blandit lectus ac, laoreet est. Ut lobortis nisl sit amet <b>fringilla</b> gravida. Donec arcu lectus, porttitor sed vestibulum vitae, vestibulum ut justo. Duis maximus viverra risus, ac finibus enim pellentesque ac. Cras interdum posuere orci, ut ultricies elit ullamcorper ut.</p>"
        },
        {
            "type":"gapsimple",
            "title":"a gapsimple module with drag and drop",
            "context":"",
            "directive":"do this",
            "fillers":["dream","day"],
            "tofill":"<p>I have a <b></b> that one <b></b> this nation will rise up and live out the true meaning of its creed - we hold these truths to be self-evident: that all men are created equal.</p><p>I have a <b></b> that one <b></b> on the red hills of Georgia the sons of former slaves and the sons of former slave-owners will be able to sit down together at a table of brotherhood.</p><p>I have a <b></b> that one <b></b> even the state of Mississippi, a desert state, sweltering with the heat of injustice and oppression, will be transformed into an oasis of freedom and justice.</p><p>I have a <b></b> that my four little children will one <b></b> live in a nation where they will not be judged by the colour of their skin but by the content of their character.</p><p>I have a <b></b> to<b></b>!</p>"
        },
        {
            "type":"gapfull",
            "title":"a first gapfull module",
            "context":"",
            "directive":"Replace bad with good and adapt sentence.",
            "sentence":"A \"bad\" job."
        },
        {
            "type":"clock",
            "title":"a clock module",
            "context":"",
            "directive":"do this"
        },
        {
            "type":"blackbox",
            "title":"a blackbox module",
            "context":"test",
            "directive":"fill in the black box below",
            "operation":"x8",
            "left":[5,10,6,11],
            "right":[56,72,32],
            "shuffle":true
        },
        {
            "type":"dragdropsorting",
            "title":"a dragdropsorting module",
            "context":"",
            "directive":"do this",
            "todrag":["1","green","blue","A","3","yellow","C","Z"],
            "todrop":["letters","colors","numbers"]
        },
        {
            "type":"cardmaze",
            "title":"a cardmaze module",
            "context":"",
            "directive":"do this",
            "mazewidth":2,
            "mazeheight":2,
            "cards":[
                {
                    "label":"A",
                    "clue":"B"
                },
                {
                    "label":"A",
                    "clue":"B"
                },
                {
                    "label":"A",
                    "clue":"B"
                },
                {
                    "label":"A",
                    "clue":"B"
                }
            ]
        }

    ]
}
```
<h2>sample sol json</h2>
```json
{
    "solutions":[
        [0,-1,2,1,-1,0],
        [-1,"marker 1","marker 2",-1,"marker 3","marker 1"],
        ["a","b","c","d","e","f"],
        ["dream","day","dream","day","dream","day","dream","day","dream","day"],
        "",
        "",
        {
            "left":[40,80,48,88],
            "right":[7,9,4]
        },
        {
            "letters":["A","C","Z"],
            "colors":["green","blue","yellow"],
            "numbers":["1","3"]
        },
        [0,5,11,17]
        
    ]
}
```
