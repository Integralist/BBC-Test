describe('Calculation', function(){

  beforeEach(function() {
    this.addMatchers({
        toBeArray: function (expected) {
            return Object.prototype.toString.call(this.actual) === '[object Array]' ? true : false;
        }
    });

    this.addMatchers({
        toBeNumber: function (expected) {
            return /\d+/.test(this.actual);
        }
    });

    this.addMatchers({
        toBeNaN: function (expected) {
            return isNaN(this.actual);
        }
    });

    var results = document.getElementById('results');
    var error_container = document.getElementById('error_container');
  });

  it('parse_data() should accept a string value', function(){
    var data = parse_data('£2.12');
    expect(data).toBeArray();
  });

  it('parse_data() should not allow an empty value or space value', function(){
    expect(parse_data('')).toBeFalsy();
    expect(parse_data('  ')).toBeFalsy();
  });

  it('evaluate_amount() should return numerical value', function(){
    expect(evaluate_amount(['£2.12p','£','2.12'])).toBeNumber();
  });

  it('convert_to_pennies() should return numerical value', function(){
    expect(convert_to_pennies('2.12')).toBeNumber();
    expect(convert_to_pennies(2.12)).toBeNumber();
  });

  it('convert_to_pennies() should return NaN when passed a String of word characters', function(){
    expect(convert_to_pennies('abc')).toBeNaN();
  });

  it('calculate_sterling() should return a non-empty Object', function(){
    expect(calculate_sterling(212)).toEqual({'£2': 1, '2p': 6});
  });

  it('render() should insert a list of <li> elements into the DOM', function(){
    render({'£2': 1, '2p': 6});    
    expect(results.innerHTML).toBe('<li>£2 x1</li><li>2p x6</li>');
  });

  it('render() should add a "hide" class to the error element', function(){
    render({'£2': 1, '2p': 6});    
    expect(error_container.className).toBe('hide');
  });

});