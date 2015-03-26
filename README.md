<h1>rpnmodule</h1>
<strong>v0.1.5</strong>
<p>rpnmodule is a project aiming to provide a base library for running educational sequences of modules. It'll provide common features for 10 module types (maybe more in the future) that can be arranged in a sequence of work:</p>
<p>As the project evolves the main module in the library is rpnsequence, but project name is still rpnmodule... Sorry for confusion!!!!</p>
<h2>Dependencies</h2>
<ul>
    <li>jquery 2.1.3</li>
    <li>bootstrap 3.3.2</li>
    <li>underscore 1.7.0</li>
</ul>
<h2>Introduction</h2>
<ul>
    <li>blackbox - a mathematical module to calculate values back and forth 4 -(x4)-> 16 (sample: http://www.rpn.ch/hosting/iclasse/html5/integrationHTML5/nombres/9_sequNbBN_8.html)</li>
    <li>cardmaze - a maze of card in which you can navigate using questions on card and response on adjacent card (sample: http://www.rpn.ch/hosting/iclasse/MMF/6_html/L1_26_6_Indicatif_Laby_Sequ_1.html)</li>
    <li>clock - a clock you can manipulate to display a given hour (sample: http://www.rpn.ch/hosting/iclasse/html5/integrationHTML5/horloge/9_sequHorloge_1.html)</li>
    <li>dragdropsorting - items you can drag and drop in list of containers to sort (sample: http://www.rpn.ch/hosting/iclasse/MMF/8_html/L1_26_8_FormVerb_TriSac_Sequ_1.html)</li>
    <li>dropdown - a sentence to adapt upon directive using dropdown choices</li>
    <li>gapfull - a sentence to rewrite upon directive (sample: http://www.rpn.ch/hosting/iclasse/AideEval/10/html/AE_AccordGramm_1_5.html)</li>
    <li>gapsimple - a text to complete (sample: http://www.rpn.ch/hosting/iclasse/AideEval/10/html/AE_ParticipePasse_1_2.html)</li>
    <li>marker - a text to mark with markers (sample: http://www.rpn.ch/hosting/iclasse/html5/Fra_9_html/L1_36_9_JO_Indicatif_Present_3.html)</li>
    <li>mqc - a multiple question choice (mqc) (samples: http://www.rpn.ch/hosting/iclasse/AideEval/10/html/AE_FonctGramm_1_3.html http://www.rpn.ch/hosting/iclasse/AideEval/10/html/AE_LectureDico_2_1.html http://www.rpn.ch/hosting/iclasse/AideEval/10/html/AE_NuancesSem_3.html)</li>
    <li>sorting - a sentence shuffled to rearrange with drag and drop</li>
</ul>
<h2>main options for rpnsequence init</h2>
<ul>
    <li>sequrl - the url where to find json module sequence datas. Default: seq.json</li>
    <li>solurl - the url where to find json module sequence solutions. Default: sol.json</li>
    <li>warnonexit - do the module sequence has to display a waring message (html onbeforeunload classic warning)? default: false</li>
    <li>domelem - the element where to add sequence. default: $('body')</li>
    <li>onsequenceend (states, score) - handler called on end of sequence , receive states and score as parameters. Default: an empty function</li>
    <li>onmoduleend (states)-  handler called on end of each module , receive states as parameter. Default: an empty function</li>
    <li>mediapathformatter - a function to update media paths. default: function(val){return 'medias/'+val;}</li>
    <li>language - which language to use for labels? Default:fr available: fr,en</li>
    <li>debug - add some console output. default: false</li>
    <li>disablestateloading - if true bypass loading states and generate empty states for modules. default: false</li>
    <li>navigationEnabled - Does the sequence have to display a navigation pager? default: false</li>
    <li>quitDisabled - Does the sequence have to hide the upper quit button? default: false</li>
</ul>

<h2>default sequence datas</h2>
By default a sequence json datas has to handle these values:
<ul>
    <li>title - the sequence title displayed along all modules on top of them (first level title)</li>
    <li>modules - a list of modules to display</li>
</ul>
    
<h2>module shared datas</h2>
<ul>
    <li>type - the type of the module itself choose: blackbox|cardmaze|clock|dragdropsorting|gapfull|gapsimple|marker|mqc</li>
    <li>title - a title diplayed on top of module (second level title)</li>
    <li>context - a context short description (third level title)</li>
    <li>directive - a directive (fourth level title)</li>
    <li>recall - a recall for student (displayed actually as a modal dialog toggled by a link)</li>
    <li>order - an order for student (displayed actually as a modal dialog toggled by a link) </li>
    <li>disposition - where to place context and directive (top|left|right|bottom). Default: top</li>
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

<h3>dragdropsorting options</h3>
<ul>
    <li>todrag - a list of items to sort in containers</li>
    <li>todrop - a list of containers where to drag and drop items</li>
</ul>

<h3>dropdown options</h3>
<ul>
    <li>sentence - a sentence to adapt</li>
    <li>circumstance - an array of 2 labels introducing the orginal sentence and the text to adapt</li>
    <li>items - a list of choice (each of them is an array of texts labeled choice)</li>
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
    <li>hidden - if true marker targets are not bolded so they are not visible (default false)</li>
    <li>background - <ul>
                        <li>url : the url to background image mandatory if background is setted</li>
                        <li>width - the fixed width of content(default 100%)</li>
    				    <li>height - the fixed height of content (default 100%)</li>
    				    <li>paddingTop - padding top for inner content(default 0px)</li>
    				    <li>paddingRight - padding right for inner content(default 0px)</li>
    				    <li>paddingBottom - padding bottom for inner content(default 0px)</li>
    				    <li>paddingLeft - padding left for inner content(default 0px)</li>
                     </ul>
    </li>
</ul>

<h3>mqc options</h3>
<ul>
    <li>questions - a list of questions</li>
    <li>answers - a list of choice for each questions (if there is only one it is common to all questions)</li>
</ul>

<h3>sorting options</h3>
<ul>
    <li>sentence - a list of item to rearrange</li>
    <li>shuffle - shuffle items in sentence or use it as is? Default: false</li>
</ul>

<h2>sample seq json</h2>
```json
{
    "title":"modulesequence",
    "modules":[
        {
            "type":"blackbox",
            "sources":"<a href=\"https://en.wikipedia.org/wiki/JavaScript\" target=\"_blank\">javascript</a>",
            "recall":"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus posuere velit tortor, vel ullamcorper orci luctus sed.</p><img src=\"logo.png\" /><p>Etiam ut molestie lorem, ac venenatis libero. Nunc quis dolor tristique, fringilla quam nec, accumsan ipsum.</p><p>Aliquam malesuada odio vel purus scelerisque, ac tempus lectus sodales.</p><img src=\"logo2.png\" /><p>Ut accumsan, ligula vitae fermentum fringilla, magna sapien dignissim turpis, a porta eros ante id diam. Maecenas mauris erat, fringilla eget rutrum sit amet, malesuada ac ipsum. Donec semper interdum sapien, vel dapibus sem suscipit at. Mauris volutpat neque a cursus consequat. Donec sed leo at erat aliquam porta. Pellentesque nisi augue, pulvinar sed pulvinar sed, pulvinar sit amet nisl.</p>",
            "order":"<h1>First do this</h1><h2>then that</h2><p>and finally this!</p>",
            "operation":"x8",
            "validation":{
                "mode":"lock",
                "type":"integer"
            },
            "left":[5,10,6,11],
            "right":[56,72,32],
            "shuffle":true
        },
        {
            "type":"blackbox",
            "directive":"<p>Do this :</p>",
            "operation":"",
            "validation":{
                "mode":"lock",
                "type":"integer"
            },
            "left":[5,10,6,11],
            "right":[56,72,32],
            "shuffle":false
        },
        {
            "type":"cardmaze",
            "sources":"Dictionnary article #24.13",
            "title":"a cardmaze module",
            "context":"",
            "directive":"do this",
            "mazewidth":6,
            "mazeheight":4,
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
                    "start":true,
                    "label":"START",
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
                },
                {
                    "end":true,
                    "label":"A",
                    "clue":"END"
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
        },
        {
            "type":"clock",
            "title":"a clock module",
            "context":"",
            "directive":"display 22:17 on following dial",
            "random":false
        },
        {
            "type":"dragdropsorting",
            "title":"a dragdropsorting module",
            "context":"",
            "directive":"do this",
            "todrag":["1","green","blue","Lorem ipsum dolor sit amet, consectetur adipiscing elit.","A","3","yellow","C","Z"],
            "todrop":["letters","colors","numbers","sentences"]
        },
        {
            "type":"dropdown",
            "title":"a dropdown module",
            "context":"",
            "directive":"Select the right words from the options and adapt sentence.",
            "sentence":"Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
            "circumstance":["Original","Item to select"],
            "items":[
                {
                    "choice":["Lorem","Lorems"]
                },
                {
                    "choice":["dictum","ipsum","vestibulum"]
                },
                {
                    "choice":["dolor sit amet,"]
                },
                {
                    "choice":["consectetur","fringilla"]
                },
                {
                    "choice":["adipiscing"]
                },
                {
                    "choice":["elit.","finibus.","faucibus.","gravida."]
                }
            ],
            "sources":"Donec arcu lectus, porttitor sed vestibulum vitae."
        },
        {
            "type":"gapfull",
            "title":"a first gapfull module",
            "context":"",
            "directive":"Replace bad with good and adapt sentence.",
            "sentence":"A \"bad\" job."
        },
        {
            "type":"gapfull",
            "title":"a second gapfull module",
            "context":"",
            "directive":"Replace small with big and adapt sentence.",
            "sentence":"The small mountain."
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
            "title":"a gapsimple module",
            "context":"",
            "directive":"Calculates :",
            "tofill":"<p>18 + 7 = <b></b></p>"
        },
        {
            "type":"gapsimple",
            "title":"a gapsimple module with drag and drop (multiple)",
            "context":"",
            "directive":"do this",
            "fillers":["dream","day"],
            "tofill":"<p>I have a <b></b> that one <b></b> this nation will rise up and live out the true meaning of its creed - we hold these truths to be self-evident: that all men are created equal.</p><p>I have a <b></b> that one <b></b> on the red hills of Georgia the sons of former slaves and the sons of former slave-owners will be able to sit down together at a table of brotherhood.</p><p>I have a <b></b> that one <b></b> even the state of Mississippi, a desert state, sweltering with the heat of injustice and oppression, will be transformed into an oasis of freedom and justice.</p><p>I have a <b></b> that my four little children will one <b></b> live in a nation where they will not be judged by the colour of their skin but by the content of their character.</p><p>I have a <b></b> to<b></b>!</p>"
        },
        {
            "type":"gapsimple",
            "title":"a gapsimple module with drag and drop (single)",
            "context":"",
            "directive":"do this",
            "fillers":["dream","day"],
            "tofill":"<p>I have a <b></b> that one <b></b> this nation will rise up and live out the true meaning of its creed - we hold these truths to be self-evident: that all men are created equal.</p>"
        },
        {
            "type":"marker",
            "title":"a marker module",
            "directive":"try to mark words",
	        "markers":["marker1","marker2","marker3"],
            "tomark":"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <b>Etiam</b> rutrum convallis maximus. Nulla faucibus mi ante, sed efficitur mi <b>ultrices</b> vel.</p><p>Class aptent taciti sociosqu ad litora torquent per <b>conubia</b> nostra, per inceptos himenaeos. Maecenas sem sapien, dictum lobortis malesuada at, pulvinar ac tortor. Donec vitae quam massa. Mauris eu ante nibh. Donec eu dapibus est, id vestibulum urna. Suspendisse eu arcu neque. Mauris sed placerat orci, vel lobortis augue.</p><p>Suspendisse nisi tellus, finibus sit amet rutrum et, molestie quis dolor. Duis pretium ipsum eu sem <b>lobortis</b>, eget varius urna sagittis.</p><p><b>Etiam</b> et dolor sit amet quam finibus faucibus ac porttitor dui. Vestibulum et erat ac nulla <img src='book3.png' align='right'> cursus gravida et a dui. Nunc egestas purus dui, ac lobortis turpis rhoncus a. Sed ac accumsan eros. Vivamus eget vestibulum augue, vel lacinia orci. Duis vitae leo vel dolor lacinia volutpat fermentum et leo. Sed ac efficitur tellus. Quisque eget commodo ligula.</p><p>In mollis convallis turpis, sit amet luctus purus tempor a. Integer vel convallis arcu, porttitor laoreet mauris. Sed porttitor pharetra purus nec sagittis. Curabitur ac purus finibus, blandit lectus ac, laoreet est. Ut lobortis nisl sit amet <b>fringilla</b> gravida. Donec arcu lectus, porttitor sed vestibulum vitae, vestibulum ut justo. Duis maximus viverra risus, ac finibus enim pellentesque ac. Cras interdum posuere orci, ut ultricies elit ullamcorper ut.</p>"
        },
        {
            "type":"marker",
            "title":"a marker module",
            "directive":"try to mark words",
	        "markers":["marker1","marker2","marker3"],
            "tomark":"<p> <img src='book2.png' align='left'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <b>Etiam</b> rutrum convallis maximus. Nulla faucibus mi ante, sed efficitur mi <b>ultrices</b> vel.</p><p>Class aptent taciti sociosqu ad litora torquent per <b>conubia</b> nostra, per inceptos himenaeos. Maecenas sem sapien, dictum lobortis malesuada at, pulvinar ac tortor. Donec vitae quam massa. Mauris eu ante nibh. Donec eu dapibus est, id vestibulum urna. Suspendisse eu arcu neque. Mauris sed placerat orci, vel lobortis augue.</p><p>Suspendisse nisi tellus, finibus sit amet rutrum et, molestie quis dolor. Duis pretium ipsum eu sem <b>lobortis</b>, eget varius urna sagittis.</p><p><b>Etiam</b> et dolor sit amet quam finibus faucibus ac porttitor dui. Vestibulum et erat ac nulla <img src='book3.png' align='right'> cursus gravida et a dui. Nunc egestas purus dui, ac lobortis turpis rhoncus a. Sed ac accumsan eros. Vivamus eget vestibulum augue, vel lacinia orci. Duis vitae leo vel dolor lacinia volutpat fermentum et leo. Sed ac efficitur tellus. Quisque eget commodo ligula.</p><p>In mollis convallis turpis, sit amet luctus purus tempor a. Integer vel convallis arcu, porttitor laoreet mauris. Sed porttitor pharetra purus nec sagittis. Curabitur ac purus finibus, blandit lectus ac, laoreet est. Ut lobortis nisl sit amet <b>fringilla</b> gravida. Donec arcu lectus, porttitor sed vestibulum vitae, vestibulum ut justo. Duis maximus viverra risus, ac finibus enim pellentesque ac. Cras interdum posuere orci, ut ultricies elit ullamcorper ut.</p>",
            "hidden":true,
            "background":
            {
				"url":"book1.png",
				"width":"600px",
				"height":"900px",
				"paddingTop":"35px",
				"paddingRight":"35px",
				"paddingBottom":"35px",
				"paddingLeft":"110px",
				"align":"center"
            }
        },
        {
            "type":"marker",
            "title":"a marker module",
            "directive":"try to mark words",
	        "markers":["marker1","marker2","marker3"],
            "tomark":"<p> <img src='book2.png' align='left'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. <b>Etiam</b> rutrum convallis maximus. Nulla faucibus mi ante, sed efficitur mi <b>ultrices</b> vel.</p><p>Class aptent taciti sociosqu ad litora torquent per <b>conubia</b> nostra, per inceptos himenaeos. Maecenas sem sapien, dictum lobortis malesuada at, pulvinar ac tortor. Donec vitae quam massa. Mauris eu ante nibh. Donec eu dapibus est, id vestibulum urna. Suspendisse eu arcu neque. Mauris sed placerat orci, vel lobortis augue.</p><p>Suspendisse nisi tellus, finibus sit amet rutrum et, molestie quis dolor. Duis pretium ipsum eu sem <b>lobortis</b>, eget varius urna sagittis.</p><p><b>Etiam</b> et dolor sit amet quam finibus faucibus ac porttitor dui. Vestibulum et erat ac nulla <img src='book3.png' align='right'> cursus gravida et a dui. Nunc egestas purus dui, ac lobortis turpis rhoncus a. Sed ac accumsan eros. Vivamus eget vestibulum augue, vel lacinia orci. Duis vitae leo vel dolor lacinia volutpat fermentum et leo. Sed ac efficitur tellus. Quisque eget commodo ligula.</p><p>In mollis convallis turpis, sit amet luctus purus tempor a. Integer vel convallis arcu, porttitor laoreet mauris. Sed porttitor pharetra purus nec sagittis. Curabitur ac purus finibus, blandit lectus ac, laoreet est. Ut lobortis nisl sit amet <b>fringilla</b> gravida. Donec arcu lectus, porttitor sed vestibulum vitae, vestibulum ut justo. Duis maximus viverra risus, ac finibus enim pellentesque ac. Cras interdum posuere orci, ut ultricies elit ullamcorper ut.</p>",
            "background":
            {
				"url":"book1.png",
				"width":"600px",
				"height":"900px",
				"paddingTop":"35px",
				"paddingRight":"35px",
				"paddingBottom":"35px",
				"paddingLeft":"110px",
				"align":"center"
            }
        },
        {
            "type":"mqc",
            "title":"identifier ",
            "context":"context",
            "directive":"bla bla bla.",
            "questions":[
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit ?",
                "Curabitur vitae purus vulputate, rutrum tortor eu, pulvinar justo ?",
                "Donec et turpis ut risus ullamcorper accumsan ?",
                "Praesent eleifend sem quis mauris consequat, sit amet rutrum elit interdum ?",
                "Vestibulum ac pulvinar magna. Nullam efficitur luctus sapien eget sagittis ?",
                "Vivamus et metus imperdiet, facilisis nisl eget, semper ligula ?"
            ],
            "answers":[
				{"choice":["What","When","Where","Who"]}
			]
        },
        {
            "type":"mqc",
            "title":"identifier ",
            "context":"context",
            "directive":"bla bla bla.",
            "questions":[
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit ?",
                "Curabitur vitae purus vulputate, rutrum tortor eu, pulvinar justo ?",
                "Donec et turpis ut risus ullamcorper accumsan ?",
                "Praesent eleifend sem quis mauris consequat, sit amet rutrum elit interdum ?"
            ],
            "answers":[
				{"choice":["What","When","Where","Who"]},
				{"choice":["What","When","Where","Who"]},
				{"choice":["Where","When","What","When"]},
				{"choice":["When","Where","Where","What"]}
			]
        },
		{
            "type":"mqc",
            "title":"identifier ",
            "context":"context",
            "directive":"bla bla bla.",
            "questions":["Lorem ipsum dolor sit amet, consectetur adipiscing elit ?"],
            "illustration":{
                "position":"top",
                "url":"<img src='logo2.png'>"
            },
            "answers":[
                {"choice":["What","When","Where","Who"]}
			]
        },
		{
            "type":"mqc",
            "title":"identifier ",
            "context":"context",
            "directive":"bla bla bla.",
            "questions":["Lorem ipsum dolor sit amet, consectetur adipiscing elit ?"],
            "illustration":{
                "position":"right",
                "url":"<img src='logo2.png'>"
            },
            "answers":[
				{"choice":["What","When","Where","Who"]}
            ]
        },
		{
            "type":"mqc",
            "title":"identifier ",
            "context":"context",
            "directive":"bla bla bla.",
            "questions":["Lorem ipsum dolor sit amet, consectetur adipiscing elit ?"],
            "illustration":{
                "position":"left",
                "url":"<img src='logo2.png'>"
            },
            "answers":[
				{"choice":["What","When","Where","Who"]}
            ]
        },
		{
            "type":"mqc",
            "title":"identifier ",
            "context":"context",
            "directive":"bla bla bla.",
            "questions":["Lorem ipsum dolor sit amet, consectetur adipiscing elit ?"],
            "illustration":{
                "position":"bottom",
                "url":"<img src='logo2.png'>"
            },
            "answers":[
				{"choice":["What","When","Where","Who"]}
			]
        },
        {
            "type":"sorting",
            "title":"a sorting module",
            "context":"",
            "directive":"Sort this!",
            "sentence":["Lorem","ipsum","dolor","sit","amet,","consectetur","adipiscing","elit."],
            "shuffle":true,
            "sources":"Donec arcu lectus, porttitor sed vestibulum vitae."
        }
    ]
}
```
<h2>sample sol json</h2>
```json
{
    "solutions":[
        {
            "left":[40,80,48,88],
            "right":[7,9,4]
        },
        {
            "left":[40,80,48,88],
            "right":[7,9,4]
        },
        [2,1,0,6,12,18],
        "22:17",
        {
            "letters":["A","C","Z"],
            "colors":["green","blue","yellow"],
            "numbers":["1","3"],
            "sentences":["Lorem ipsum dolor sit amet, consectetur adipiscing elit."]
        },
        [
		    {"alternative":["Lorems"]},
			{"alternative":["dictum","ipsum"]},
			{"alternative":["fringilla"]},
			{"alternative":["gravida.",""]}
		],
		"A \"good\" job.",
        "The big mountain.",
        ["a","b","c","d","e","f"],
        ["25"],
        ["dream","day","dream","day","dream","day","dream","day","dream","day"],
        ["dream","day"],
        ["","marker1","marker2","marker3","","marker1"],
        ["","marker1","marker2","marker3","","marker1"],
        ["","marker1","marker2","marker3","","marker1"],
        ["What","What","What","What","What","What"],
        ["What","What","What","What"],
        ["What"],
        ["What"],
        ["What"],
        ["What"],
        ["Lorem","ipsum","dolor","sit","amet,","consectetur","adipiscing","elit."]
    ]
}
```
