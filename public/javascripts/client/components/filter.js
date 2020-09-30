function LoadFilter() {
	var html = '';
	html=html+'<i class="fas fa-th-large gridDisplayBtn" onclick="vehicleDisplay()"></i>';
	html=html+'<div class="searchBar">';
	html=html+'	<input type="text">';
	html=html+'	<i class="fas fa-search searchBtn"></i>';
	html=html+'</div>';
	html=html+'<i class="fas fa-ellipsis-v filterBtn" onclick="slideFilterMenu()"></i>';
  
	$("#Filter").empty();
	$("#Filter").append(html);
  }
  LoadFilter()


  function LoadFilterSettings() {
	var html = '';
	html=html+'<div class="filterSettingContainer">';
	html=html+'<div class="sortContainer">';
	html=html+'	<label for="sort" class="sortLabel">Sort by :</label>';
	html=html+'	<select name="sort" class="sortSettingList">';
	html=html+'		<option value=""  class="sortSettingItems">Featured</option>';
	html=html+'		<option value=""  class="sortSettingItems">Price: Low to High</option>';
	html=html+'		<option value=""  class="sortSettingItems">Price: High to Low</option>';
	html=html+'		<option value=""  class="sortSettingItems">Avg. Customer Review</option>';
	html=html+'		<option value=""  class="sortSettingItems">Newest Arrivals</option>';
	html=html+'	</select>';
	html=html+'	</div>';
	html=html+'	<div class="conditionContainer">';
	html=html+'		<label for="condition" class="conditionLabel">Condition :</label>';
	html=html+'		<select name="condition" class="conditionSettingList">';
	html=html+'			<option value=""  class="conditionSettingItems">Any</option>';
	html=html+'			<option value=""  class="conditionSettingItems">New</option>';
	html=html+'			<option value=""  class="conditionSettingItems">Used</option>';
	html=html+'			<option value=""  class="conditionSettingItems">Lease Takeover</option>';
	html=html+'			<option value=""  class="conditionSettingItems">Salvage</option>';
	html=html+'		</select>';
	html=html+'	</div>';
	html=html+'	<div class="makeContainer">';
	html=html+'		<label for="make" class="makeLabel">Make :</label>';
	html=html+'		<select name="make" class="makeSettingList">';
	html=html+'			<option value=""  class="makeSettingItems">Honda</option>';
	html=html+'			<option value=""  class="makeSettingItems">Ford</option>';
	html=html+'			<option value=""  class="makeSettingItems">GMC</option>';
	html=html+'			<option value=""  class="makeSettingItems">Dodge</option>';
	html=html+'			<option value=""  class="makeSettingItems">Toyota</option>';
	html=html+'		</select>';
	html=html+'	</div>';
	html=html+'	<div class="modelContainer">';
	html=html+'		<label for="model" class="modelLabel">Make :</label>';
	html=html+'		<select name="model" class="modelSettingList">';
	html=html+'			<option value=""  class="modelSettingItems">Civic</option>';
	html=html+'			<option value=""  class="modelSettingItems">Focus</option>';
	html=html+'			<option value=""  class="modelSettingItems">Sierra</option>';
	html=html+'			<option value=""  class="modelSettingItems">Corolla</option>';
	html=html+'		</select>';
	html=html+'	</div>';
	html=html+'</div>';

	$("#FilterSettings").empty();
	$("#FilterSettings").append(html);
}
LoadFilterSettings()