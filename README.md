# Ya2HT_ml
YAML to HTML converter for writing html in more readable format.

## Usage
Open yaml2html.htm in your browser or vs code preview . It runs a js script that loads the test.yaml file and converts it. Standard tag is the div tag since it's used everywhere. The keys in the yaml are kind of like css selectors. Your can write a dot to determine the classes. Everything after the dot seperated by spaces are the classnames. With an opening square bracked after that you can specify the attributes. A closing square bracket isn't needed and doesn't work.


## Example YAML
This example uses bootstrap:

    .card:
        .card-header: asd
        .card-body: 
        - asddasdasdasd
        - button.btn btn-primary[onclick=alert("12"): OK
        .card[style=background:#caaca0: Lorem Ipsum

