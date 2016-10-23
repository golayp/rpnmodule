<h1>rpnmodule</h1>
<strong>v0.2.6</strong>
<p>rpnmodule is a project aiming to provide a base library for running educational sequences of modules. It'll provide common features for modules that can be arranged in a sequence of work:</p>
<p>As the project evolves the main module in the library is rpnsequence, but project name is still rpnmodule... Sorry for confusion!!!!</p>

<h2>Dependencies</h2>
<ul>
    <li>jquery 2.1.4</li>
    <li>bootstrap 3.3.6</li>
    <li>underscore 1.8.3</li>
    <li>jsPlumb 2.0.4 - included in builded library</li>
</ul>

<h2>Introduction</h2>
<ul>
    <li>blackbox - a mathematical module to calculate values back and forth 4 -(x4)-> 16</li>
    <li>cardmaze - a maze of card in which you can navigate using questions on card and response on adjacent card</li>
    <li>dragdropsorting - items you can drag and drop in list of containers to sort</li>
    <li>dropdown - a sentence to adapt upon directive using dropdown choices</li>
    <li>gapfull - a sentence to rewrite upon directive</li>
    <li>gapsimple - a text to complete</li>
    <li>marker - a text to mark with markers</li>
    <li>mqc - a multiple question choice (mqc)</li>
    <li>plumb - a source/target link module using jsPlumb</li>
    <li>sorting - a sentence shuffled to rearrange with drag and drop</li>
</ul>

<h2>main options for rpnsequence init</h2>
<ul>
    <li>sequrl - the url where to find json module sequence datas (default: seq.json)</li>
    <li>solurl - the url where to find json module sequence solutions (default: sol.json)</li>
    <li>warnonexit - do the module sequence has to display a waring message (html onbeforeunload classic warning)? (default: false)</li>
    <li>domelem - the element where to add sequence. default: $('body')</li>
    <li>onsequenceend (states, score) - handler called on end of sequence , receive states and score as parameters (default: an empty function)</li>
    <li>onmoduleend (states)-  handler called on end of each module , receive states as parameter (default: an empty function)</li>
    <li>mediapathformatter - a function to update media paths (default: function(val){return 'medias/'+val;})</li>
    <li>language - which language to use for labels? (default:fr available: fr,en)</li>
    <li>debug - add some console output (default: false)</li>
    <li>disablestateloading - if true bypass loading states and generate empty states for modules (default: false)</li>
    <li>navigationEnabled - Does the sequence have to display a navigation pager? (default: false)</li>
    <li>quitDisabled - Does the sequence have to hide the upper quit button? (default: false)</li>
    <li>bypassModule - Compute score without ui rendering for correction purpose (default: false)</li>
    <li>testMode - Correct module and display score in a modal at end of sequence for test purpose (default: false)</li>
    <li>background - A background image shared by all modules--> this can be overwriten by background property in module</li>
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
    <li>smallButtons - if true marker buttons are set to default size if false to btn-lg size (default false)</li>
    <li>displayTooltip - if true marked elements display a tooltip on mouse hover or focus (default:true)</li>
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

<h3>plumb options</h3>
<ul>
    <li>left - a list of items placed on the left side</li>
    <li>right - a list of items place on the right side</li>
    <li>shuffle - shuffle items ? (true/false default false)</li>
    <li>multipleTarget - allow multiple endpoint on target left items ? (true/false default false)</li>
</ul>

<h3>sorting options</h3>
<ul>
    <li>sentence - a list of item to rearrange</li>
    <li>shuffle - shuffle items in sentence ? (default: false)</li>
</ul>